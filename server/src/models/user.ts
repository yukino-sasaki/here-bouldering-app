import mongoose from "mongoose";
import { User } from "../generated/graphql";

const Schema = mongoose.Schema;

const UserModelSchema = new Schema(
  {
    userId: { type: String, required: true },
    email: { type: String, required: true },
    nickname: { type: String, required: true },
    avatarImage: { type: String, required: true },
    climbingTime: { type: Array },
    registerGyms: { type: Array },
  },
  { timestamps: true }
);

export default mongoose.model<User>("Users", UserModelSchema);
