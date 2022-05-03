import { MutateStatus, MutationResolvers } from "../../generated/graphql";
import Gym from "../../models/gyms";
import User from "../../models/user";

export const unregisterGym: MutationResolvers["unregisterGym"] = async (
  _,
  { gymId },
  { id }
) => {
  const me = await User.findOneAndUpdate(
    {
      userId: id,
    },
    {
      $pull: {
        registerGyms: { gymId },
      },
    },
    {
      new: true,
    }
  );

  await Gym.findOneAndUpdate(
    { gymId },
    {
      $pull: {
        climbingUser: { userId: id },
      },
    },
    { new: true }
  );

  return {
    registerGyms: me?.registerGyms,
    status: MutateStatus.Success,
    message: "ジムの登録を解除しました！",
  };
};
