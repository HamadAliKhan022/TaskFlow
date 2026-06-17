const firebaseErrorMessages = {
  "auth/email-already-in-use": "An account already exists with this email address.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/invalid-credential": "The email or password is incorrect.",
  "auth/user-not-found": "No account was found with this email address.",
  "auth/wrong-password": "The email or password is incorrect.",
  "auth/weak-password": "Password must contain at least 6 characters.",
  "auth/too-many-requests": "Too many attempts. Please wait and try again.",
  "auth/network-request-failed": "Network error. Check your internet connection.",
  "auth/user-disabled": "This account has been disabled.",
  "permission-denied": "You do not have permission to perform this action.",
  unavailable: "The service is temporarily unavailable. Please try again.",
};

export function getFirebaseErrorMessage(error) {
  const code = error?.code || "";
  return (
    firebaseErrorMessages[code] ||
    error?.message ||
    "Something went wrong. Please try again."
  );
}
