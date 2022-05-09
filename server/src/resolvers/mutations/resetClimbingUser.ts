import { MutateStatus, MutationResolvers } from "../../generated/graphql";
import Gym from "../../models/gyms";
import User from "../../models/user";

export const resetClimbingUser: MutationResolvers["resetClimbingUser"] =
  async () => {
    const res = await User.updateMany(
      {},
      {
        $set: {
          climbingTime: [],
        },
      }
    );
    console.log(res);
    const gym = await Gym.updateMany(
      {},
      {
        $set: {
          "climbingUser.$[].finishClimbingTime": null,
          "climbingUser.$[].startClimbingTime": null,
        },
      }
    );
    console.log(res, gym);
    return {
      status: MutateStatus.Success,
      message: "成功しました！",
    };
  };