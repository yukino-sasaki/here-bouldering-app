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
  const [userData, setUserData] = useState<User | null>();

  const navigateUserScreen = () => {
    // wish to navigate each id. it's tentative
    navigate("/user", { state: { userData } });
  };

  const navigateHomeScreen = () => {
    // wish to navigate each id. it's tentative
    navigate("/", { state: { userData } });
  };

  const handleSignIn = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential && credential.accessToken;
        // The signed-in user info.
        const userResponse = result.user;
        navigate("/user", { state: { user: userResponse } });
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

  onAuthStateChanged(auth, (currentUser) => {
    setUserData(currentUser);
  });

  const registerUser = async (
    registerEmail: string,
    registerPassword: string
  ) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      ).then((userCredential) => {
        const userResponse = userCredential.user;
        const { email, uid } = userResponse;
        setUserData(userResponse);
        navigate("/user", { state: { user: { email, uid } } });
      });
    } catch (error) {
      console.log(error);
    }
    navigate("/user", { state: { user: userData } });
  };

  const login = async (loginEmail: string, loginPassword: string) => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword).then(
        (userCredential) => {
          // Signed in
          const userResponse = userCredential.user;

          const { email, uid } = userResponse;
          setUserData(userResponse);
          navigate("/user", { state: { user: { email, uid } } });
          navigateHomeScreen();
        }
      );
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
