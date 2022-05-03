import { MutateStatus, MutationResolvers } from "../../generated/graphql";
import Gym from "../../models/gyms";
import User from "../../models/user";

export const addClimbingUser: MutationResolvers["addClimbingUser"] = async (
  _,
  { input },
  { id }
) => {
  const { gymId, name, ...registerClimbingUserInput } = input;
  const { finishClimbingTime, startClimbingTime } = registerClimbingUserInput;
  console.log(registerClimbingUserInput);

  const meInfo = await User.findOne({
    userId: id,
  });

  const existClimbingTime = meInfo?.climbingTime?.map((climbingTime) => {
    return {
      existFinishClimbingTime: climbingTime?.finishClimbingTime,
      existStartClimbingTime: climbingTime?.startClimbingTime,
    };
  });

  const checkClimbingTime = existClimbingTime?.find(
    ({ existFinishClimbingTime, existStartClimbingTime }) => {
      if (!existFinishClimbingTime || !existStartClimbingTime) return undefined;
      return (
        (new Date(finishClimbingTime).getTime() <
          new Date(existFinishClimbingTime).getTime() &&
          new Date(finishClimbingTime).getTime() >
            new Date(existStartClimbingTime).getTime()) ||
        (new Date(startClimbingTime).getTime() >
          new Date(existStartClimbingTime).getTime() &&
          new Date(startClimbingTime).getTime() <
            new Date(existFinishClimbingTime).getTime())
      );
    }
  );
  console.log("check", checkClimbingTime);

  if (checkClimbingTime)
    return {
      status: MutateStatus.Warning,
      message: "同じ時間帯に登録されているジムがあります！",
      gym: null,
    };

  const updateGym = await Gym.findOneAndUpdate(
    {
      gymId,
    },
    {
      $push: {
        climbingUser: registerClimbingUserInput,
      },
    },
    {
      new: true,
    }
  );

  await User.findOneAndUpdate(
    {
      userId: id,
    },
    {
      $push: {
        climbingTime: {
          gymId,
          name,
          startClimbingTime,
          finishClimbingTime,
        },
      },
    },
    {
      new: true,
    }
  );

  return {
    status: MutateStatus.Success,
    message: "成功しました！",
    gym: updateGym,
  };
};
