import { addClimbingUser } from "./mutations/addClimbingUser";
import { addGyms } from "./mutations/addGyms";
import { createUser } from "./mutations/createUser";
import { editClimbingUser } from "./mutations/editClimbingUser";
import { editMe } from "./mutations/editMe";
import { registerGym } from "./mutations/registerGym";
import { removeClimbingUser } from "./mutations/removeClimingUser";
import { removeGym } from "./mutations/removeGym";
import { resetClimbingUser } from "./mutations/resetClimbingUser";
import { unregisterGym } from "./mutations/unregisterGym";
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
    addClimbingUser,
    editMe,
    removeGym,
    unregisterGym,
    removeClimbingUser,
    resetClimbingUser,
    editClimbingUser,
  },
};
