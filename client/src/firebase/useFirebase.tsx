import { useToast } from "@chakra-ui/react";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";

const useFirebase = () => {
  const provider = new GoogleAuthProvider();
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

  // google authrication
  const registerWithGoogle = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        const { email, uid } = user;
        navigate("/user", { state: { user: { email, uid } } });
        console.log({ credential, token, user });
        // ...
      })
      .catch((error) => {
        console.log(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const loginWithGoogle = async () => {
    console.log("login with google");
    await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        console.log("result", result);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential);

        // The signed-in user info.
        navigate("/");
        // navigate("/", { state: userResponse });
      })
      .catch((error) => {
        console.log(error.message);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const logout = async () => {
    await signOut(auth);
  };
  return {
    auth,
    registerUser,
    registerWithGoogle,
    loginWithGoogle,
    login,
    logout,
  };
};

export default useFirebase;
