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
  const { gymId, finishClimbingTime, startClimbingTime, climbingId } = input;

  let editClimbingUser;
  if (startClimbingTime) {
    editClimbingUser = await Gym.findOneAndUpdate(
      {
        gymId,
        climbingUser: {
          $elemMatch: {
            userId: id,
            climbingId,
          },
        },
      },
      {
        $set: {
          "climbingUser.$.finishClimbingTime": finishClimbingTime,
          "climbingUser.$.startClimbingTime": startClimbingTime,
        },
      },
      {
        arrayFilters: [{ "climbingUser.$.userId": id }],
        new: true,
      }
    );

    console.log(climbingId, editClimbingUser);

    await User.findOneAndUpdate(
      {
        userId: id,
        climbingTime: {
          $elemMatch: {
            gymId,
            climbingId,
          },
        },
      },
      {
        $set: {
          "climbingTime.$.finishClimbingTime": finishClimbingTime,
          "climbingTime.$.startClimbingTime": startClimbingTime,
        },
      },
      {
        arrayFilters: [{ "climbingTime.$.gymId": gymId }],
      }
    );
  } else {
    editClimbingUser = await Gym.findOneAndUpdate(
      {
        gymId,
        climbingUser: {
          $elemMatch: {
            userId: id,
            climbingId,
          },
        },
      },
      {
        $set: {
          "climbingUser.$.finishClimbingTime": finishClimbingTime,
        },
      },
      {
        arrayFilters: [{ "climbingUser.$.userId": id }],
        new: true,
      }
    );

    await User.findOneAndUpdate(
      {
        userId: id,
        climbingTime: {
          $elemMatch: {
            gymId,
            climbingId,
          },
        },
      },
      {
        $set: {
          "climbingTime.$.finishClimbingTime": finishClimbingTime,
        },
      },
      {
        arrayFilters: [{ "climbingTime.$.gymId": gymId }],
      }
    );
  }

  return {
    status: MutateStatus.Success,
    message: "登る時間を更新しました！",
    gym: editClimbingUser,
  };
};
