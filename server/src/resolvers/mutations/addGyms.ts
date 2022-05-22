import { nanoid } from "nanoid";
import { MutateStatus, MutationResolvers } from "../../generated/graphql";
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

  return {
    status: MutateStatus.Success,
    message:
      "ジムを作成しました。メニューのジムを登録するからダッシュボードに登録してください。",
    gym: gyms,
  };
};
