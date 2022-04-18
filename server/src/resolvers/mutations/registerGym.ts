import { MutationResolvers } from "../../generated/graphql";
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
      success: false,
    };
  console.log(GymInput);

  const findSameGym = existRegisterGyms.find(
    (gym) => gym?.gymId === GymInput.gymId
  );

  if (findSameGym)
    return {
      me: user,
      success: false,
      statusMessage: "すでに同じジムが登録されています！",
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
    me,
    success: true,
    statusMessage: "成功しました！",
  };
};
