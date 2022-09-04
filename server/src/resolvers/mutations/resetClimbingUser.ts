import { MutateStatus, MutationResolvers } from "../../generated/graphql";
import Gym from "../../models/gyms";
import User from "../../models/user";

export const resetClimbingUser: MutationResolvers["resetClimbingUser"] =
  async () => {
    //今（Thu Sep 06 2012 09:04:30 GMT+0900）
    var _d = new Date();

    //同日の0時0分0秒
    var d = new Date(_d.getFullYear(), _d.getMonth(), _d.getDate(), 0, 0, 0);

    console.log("reset!");
    await User.updateMany(
      {},
      {
        $pull: {
          climbingTime: { registeredTime: { $lt: d.toISOString() } },
        },
      }
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
