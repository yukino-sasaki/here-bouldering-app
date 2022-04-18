import { nanoid } from "nanoid";
import { MutationResolvers } from "../../generated/graphql";
import Gym from "../../models/gyms";

export const addGyms: MutationResolvers["addGyms"] = async (
  _,
  { name, place, CreaterInput }
) => {
  const gyms = await new Gym({
    gymId: nanoid(),
    name,
    place,
    creater: {
      ...CreaterInput,
    },
    climbingUser: [],
  }).save();
  console.log("GYM", gyms);
  return gyms;
};
