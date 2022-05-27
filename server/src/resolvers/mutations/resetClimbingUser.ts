import { MutateStatus, MutationResolvers } from "../../generated/graphql";
import Gym from "../../models/gyms";
import User from "../../models/user";

export const resetClimbingUser: MutationResolvers["resetClimbingUser"] =
  async () => {
    await User.updateMany(
      {},
      {
        $set: {
          climbingTime: [],
        },
      },
      { multi: true }
    );
    await Gym.updateMany(
      {},
      {
        $set: {
          "climbingUser.$[].finishClimbingTime": null,
          "climbingUser.$[].startClimbingTime": null,
        },
      },
      { multi: true }
    );
    return {
      status: MutateStatus.Success,
      message: "成功しました！",
    };
  };
