import mongoose from "mongoose";
import { Gym } from "../generated/graphql";

const Schema = mongoose.Schema;

const CreaterSchema = new Schema({
  userId: { type: String },
  nickname: { type: String },
  avatarImage: { type: String },
});

const GymsModelSchema = new Schema(
  {
    gymId: { type: String },
    name: { type: String, required: true },
    place: { type: String, required: true },
    creater: CreaterSchema,
    climbingUser: { type: Array },
  },
  { timestamps: true }
);

export default mongoose.model<Gym>("Gym", GymsModelSchema);
