import { MutateStatus, MutationResolvers } from "../../generated/graphql";
import Gym from "../../models/gyms";
import User from "../../models/user";

export const removeGym: MutationResolvers["removeGym"] = async (
  _,
  { gymId },
  { id }
) => {
  await Gym.remove({ gymId });

  await User.findOneAndUpdate(
    {
      userId: id,
    },
    {
      $pull: {
        registerGyms: { gymId },
      },
    },
    { new: true }
  );

  return {
    status: MutateStatus.Success,
    message: "ジムを削除しました",
  };
};
