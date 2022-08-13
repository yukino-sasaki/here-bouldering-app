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
    climbingTime: [],
    registerGyms: [],
  }).save();

  return user;
};
