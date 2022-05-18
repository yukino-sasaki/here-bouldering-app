import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";

const useFirebase = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User | null>();

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
          setUserData(userResponse);
          console.log(loginEmail);
          navigate("/", { state: { userData } });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    await signOut(auth);
    navigate("/logIn");
  };
  return {
    auth,
    registerUser,
    login,
    logout,
  };
};

export default useFirebase;
