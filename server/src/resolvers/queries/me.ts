import { QueryResolvers } from "../../generated/graphql";
import User from "../../models/user";

export const me: QueryResolvers["user"] = async (_, __, { id }) => {
  const me = await User.findOne({ userId: id });
  return me;
};
