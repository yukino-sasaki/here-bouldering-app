import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";

const useFirebase = () => {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const navigateHome = () => {
    // wish to navigate each id. it's tentative
    navigate("/");
  };

  const handleSignIn = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential && credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        navigateHome();
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const [user, setUser] = useState<User | null>();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const registerUser = async (
    registerEmail: string,
    registerPassword: string
  ) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (loginEmail: string, loginPassword: string) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };
  return {
    handleSignIn,
    auth,
    registerUser,
    login,
    logout,
  };
};

export default useFirebase;
