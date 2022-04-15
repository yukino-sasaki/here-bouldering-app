import { MutationResolvers } from "../../generated/graphql";
import User from "../../models/user";

export const createUser: MutationResolvers["createUser"] = async (
  _,
  { nickname, avatarImage },
  { id, email }
) => {
  const user = await new User({
    userId: id,
    nickname,
    avatarImage: avatarImage,
    email,
    startClimbingTime: "00:00",
    finishClimbingTime: "00:00",
    registerGyms: [],
  }).save();
  console.log("USER", user);
  return user;
};
