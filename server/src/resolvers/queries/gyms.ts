import { QueryResolvers } from "../../generated/graphql";
import Gyms from "../../models/gyms";

export const gyms: QueryResolvers["gyms"] = async () => {
  const gyms = await Gyms.find();
  return gyms;
};
