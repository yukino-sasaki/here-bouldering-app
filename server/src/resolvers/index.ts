import { addGyms } from "./mutations/addGyms";
import { createUser } from "./mutations/createUser";
import { registerGym } from "./mutations/registerGym";
import { gym } from "./queries/gym";
import { gyms } from "./queries/gyms";
import { me } from "./queries/me";
import { user } from "./queries/user";

export const resolvers = {
  Query: {
    me,
    gyms,
    gym,
    user,
  },
  Mutation: {
    createUser,
    addGyms,
    registerGym,
  },
};
