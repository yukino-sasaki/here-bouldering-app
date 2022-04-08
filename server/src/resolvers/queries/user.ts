import { QueryResolvers } from "../../generated/graphql";
import User from "../../models/user";

export const user: QueryResolvers["user"] = async (_, { userId }) => {
  const user = await User.findOne({ userId });
  return user;
};
