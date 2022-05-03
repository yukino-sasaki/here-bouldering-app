import { MutateStatus, MutationResolvers } from "../../generated/graphql";
import Gym from "../../models/gyms";
import User from "../../models/user";

export const registerGym: MutationResolvers["registerGym"] = async (
  _,
  { GymInput },
  { id }
) => {
  const user = await User.findOne({ userId: id });
  const existRegisterGyms = user?.registerGyms;
  if (!existRegisterGyms || !GymInput)
    return {
      me: null,
      status: MutateStatus.Error,
    };
  console.log(GymInput);

  const findSameGym = existRegisterGyms.find(
    (gym) => gym?.gymId === GymInput.gymId
  );

  if (findSameGym)
    return {
      me: user,
      status: MutateStatus.Warning,
      message: "すでに同じジムが登録されています！",
    };

  const me = await User.findOneAndUpdate(
    {
      userId: id,
    },
    {
      $push: {
        registerGyms: GymInput,
      },
    },
    {
      new: true,
    }
  );

  await Gym.findOneAndUpdate(
    { gymId: GymInput.gymId },
    {
      $push: {
        climbingUser: me,
      },
    },
    { new: true }
  );

  return {
    registerGyms: me?.registerGyms,
    status: MutateStatus.Success,
    message: "成功しました！",
  };
};
