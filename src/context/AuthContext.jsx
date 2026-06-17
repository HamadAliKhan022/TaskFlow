import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import {
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
} from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async (user) => {
    if (!user) {
      setUserProfile(null);
      return null;
    }

    try {
      const profile = await getUserProfile(user.uid);
      const fallbackProfile = {
        name: user.displayName || user.email?.split("@")[0] || "User",
        email: user.email || "",
      };
      const finalProfile = profile || fallbackProfile;
      setUserProfile(finalProfile);
      return finalProfile;
    } catch (error) {
      const fallbackProfile = {
        name: user.displayName || user.email?.split("@")[0] || "User",
        email: user.email || "",
      };
      setUserProfile(fallbackProfile);
      return fallbackProfile;
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      await loadProfile(user);
      setLoading(false);
    });

    return unsubscribe;
  }, [loadProfile]);

  const signup = useCallback(async (name, email, password) => {
    const result = await registerUser(name, email, password);
    setCurrentUser(result.user);
    setUserProfile(result.profile);
    return result;
  }, []);

  const login = useCallback(
    async (email, password, remember) => {
      const credential = await loginUser(email, password, remember);
      setCurrentUser(credential.user);
      await loadProfile(credential.user);
      return credential;
    },
    [loadProfile],
  );

  const logout = useCallback(async () => {
    await logoutUser();
    setCurrentUser(null);
    setUserProfile(null);
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      userProfile,
      loading,
      signup,
      login,
      logout,
      refreshProfile: () => loadProfile(currentUser),
    }),
    [currentUser, userProfile, loading, signup, login, logout, loadProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }
  return context;
}
