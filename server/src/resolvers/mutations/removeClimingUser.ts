import { MutateStatus, MutationResolvers } from "../../generated/graphql";
import Gym from "../../models/gyms";
import User from "../../models/user";

export const removeClimbingUser: MutationResolvers["removeClimbingUser"] =
  async (_, { climbingId }, { id }) => {
    const removeClimbingUser = await Gym.findOneAndUpdate(
      {
        climbingUser: {
          $elemMatch: {
            climbingId,
          },
        },
      },
      {
        $pull: {
          climbingUser: { climbingId },
        },
      },
      {
        new: true,
      }
    );
    console.log(climbingId, removeClimbingUser);

    await User.findOneAndUpdate(
      {
        userId: id,
        climbingTime: {
          $elemMatch: {
            climbingId,
          },
        },
      },
      {
        $pull: {
          climbingTime: { climbingId },
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
