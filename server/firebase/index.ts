import admin from "firebase-admin";
import path from "path";

const sdkPath = path.resolve(__dirname, "./firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(sdkPath),
});

export const authorization = admin.auth();
