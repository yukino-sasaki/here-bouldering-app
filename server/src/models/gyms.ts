import mongoose from "mongoose";

const Schema = mongoose.Schema;

const GymsModelSchema = new Schema({
  gymId: { type: String },
  name: { type: String, required: true },
  place: { type: String, required: true },
  creater: { type: String },
  // climbingUser: [User]
});
