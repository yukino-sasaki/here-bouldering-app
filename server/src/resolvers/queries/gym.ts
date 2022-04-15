import { QueryResolvers } from "../../generated/graphql";
import Gym from "../../models/gyms";

export const gym: QueryResolvers["gym"] = async (_, { gymId }) => {
  const gym = await Gym.findOne({ gymId });
  console.log("FIND GYM", gym);
  return gym;
};
