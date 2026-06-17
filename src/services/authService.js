import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

export async function registerUser(name, email, password) {
  await setPersistence(auth, browserLocalPersistence);

  const credential = await createUserWithEmailAndPassword(
    auth,
    email.trim(),
    password,
  );

  const cleanName = name.trim();
  await updateProfile(credential.user, { displayName: cleanName });

  const profile = {
    name: cleanName,
    email: credential.user.email,
    createdAt: serverTimestamp(),
  };

  await setDoc(doc(db, "users", credential.user.uid), profile);

  return {
    user: credential.user,
    profile: { ...profile, createdAt: null },
  };
}

export async function loginUser(email, password, remember = true) {
  await setPersistence(
    auth,
    remember ? browserLocalPersistence : browserSessionPersistence,
  );

  return signInWithEmailAndPassword(auth, email.trim(), password);
}

export async function logoutUser() {
  return signOut(auth);
}

export async function getUserProfile(userId) {
  const snapshot = await getDoc(doc(db, "users", userId));
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
}
