import { MutateStatus, MutationResolvers } from "../../generated/graphql";
import Gym from "../../models/gyms";
import User from "../../models/user";

export const editClimbingUser: MutationResolvers["editClimbingUser"] = async (
  _,
  { input },
  { id }
) => {
  if (!input)
    return {
      gym: null,
      message: "更新できませんんでした",
      status: MutateStatus.Error,
    };
  const { gymId, finishClimbingTime, startClimbingTime } = input;

  const editClimbingUser = await Gym.findOneAndUpdate(
    {
      gymId,
      climbingUser: { id },
    },
    {
      $set: {
        "climbingUser.finishClimbingTime": finishClimbingTime,
        "climbingUser.startClimbingTime": startClimbingTime,
      },
    },
    { new: true }
  );

  await User.findOneAndUpdate(
    {
      userId: id,
    },
    {
      $set: {
        "climbingTime.finishClimbingTime": finishClimbingTime,
        "climbingUser.startClimbingTime": startClimbingTime,
      },
    }
  );

  return {
    status: MutateStatus.Success,
    message: "登る時間を更新しました！",
    gym: editClimbingUser,
  };
};
