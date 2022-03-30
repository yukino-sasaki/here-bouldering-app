import { MutationResolvers } from "../../generated/graphql";
import User from "../../models/user";

export const createUser: MutationResolvers["createUser"] = (_, { input }) => {
  const newUser = {
    // TODO: firebase auth id. set context
    userId: "gaeroigno23",
    nickname: input?.name,
    avatarImage: input?.avatarImage,
    startClimbingTime: "00:00",
    finishClimbingTime: "00:00",
  };
  const user = new User({
    userId: "gaeroigno23",
    nickname: input?.name,
    avatarImage: input?.avatarImage,
    startClimbingTime: "00:00",
    finishClimbingTime: "00:00",
  }).save();
  return user;
};
