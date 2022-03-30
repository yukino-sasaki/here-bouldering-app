import { createUser } from "./mutations/createUser";
import { gym } from "./queries/gym";

export const resolvers = {
  Query: {
    gym,
  },
  Mutation: {
    createUser,
  },
};
