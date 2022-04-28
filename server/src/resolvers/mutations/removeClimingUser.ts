import { MutateStatus, MutationResolvers } from "../../generated/graphql";
import Gym from "../../models/gyms";
import User from "../../models/user";

export const removeClimbingUser: MutationResolvers["removeClimbingUser"] =
  async (_, { gymId }, { id }) => {
    const removeClimbingUser = await Gym.findOneAndUpdate(
      {
        gymId,
        climbingUser: { userId: id },
      },
      {
        $set: {
          "climbingUser.finishClimbingTime": null,
          "climbingUser.startClimbingTime": null,
        },
      },
      {
        new: true,
      }
    );

    await User.findOneAndUpdate(
      {
        userId: id,
        climbingTime: { gymId },
      },
      {
        $pull: {
          climbingTime: { gymId },
        },
      },
      {
        new: true,
      }
    );

    return {
      status: MutateStatus.Success,
      message: "登る予定を削除しました",
      gym: removeClimbingUser,
    };
  };
