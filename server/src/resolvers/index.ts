import { createUser } from "./mutations/createUser";
import { me } from "./queries/me";
import { user } from "./queries/user";

export const resolvers = {
  Query: {
    me,
    user,
  },
  Mutation: {
    createUser,
  },
};
