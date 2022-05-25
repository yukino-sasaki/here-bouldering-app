import { useToast } from "@chakra-ui/react";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";

const useFirebase = () => {
  const navigate = useNavigate();

  const toast = useToast();

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
        navigate("/user", { state: { user: { email, uid } } });
      });
    } catch (error) {
      const { code } = error as FirebaseError;
      if (code === "auth/email-already-in-use") {
        toast({
          title: "メールアドレスがすでに存在します。ログインしてください。",
          position: "bottom",
          status: "error",
          isClosable: true,
        });
      } else if (code === "auth/invalid-email") {
        toast({
          title: "メールアドレスに不正な値があります。",
          position: "bottom",
          status: "error",
          isClosable: true,
        });
      } else if (code === "auth/weak-password") {
        toast({
          title:
            "より強力なパスワードを入力してください(例: 八文字以上、英数字を混ぜるなど)",
          position: "bottom",
          status: "error",
          isClosable: true,
        });
      } else {
        toast({
          title: code,
          position: "bottom",
          status: "error",
          isClosable: true,
        });
      }
      throw error;
    }
  };

  const login = async (loginEmail: string, loginPassword: string) => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword).then(
        (userCredential) => {
          // Signed in
          const userResponse = userCredential.user;
          navigate("/", { state: userResponse });
        }
      );
    } catch (error) {
      const { code } = error as FirebaseError;
      if (code === "auth/invalid-email") {
        toast({
          title: "メールアドレスに不正な値があります。",
          position: "bottom",
          status: "error",
          isClosable: true,
        });
      } else if (code === "auth/user-disabled") {
        toast({
          title: "ユーザーが無効です。",
          position: "bottom",
          status: "error",
          isClosable: true,
        });
      } else if (code === "auth/user-not-found") {
        toast({
          title: "ユーザーが見つかりません。サインアップしてください。",
          position: "bottom",
          status: "error",
          isClosable: true,
        });
      } else if (code === "auth/wrong-password") {
        toast({
          title: "このメールアドレスに対応するパスワードが異なります。",
          position: "bottom",
          status: "error",
          isClosable: true,
        });
      } else {
        toast({
          title: code,
          position: "bottom",
          status: "error",
          isClosable: true,
        });
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
  };
  return {
    auth,
    registerUser,
    login,
    logout,
  };
};

export default useFirebase;
