import { MutateStatus, MutationResolvers } from "../../generated/graphql";
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

  return {
    registerGyms: me?.registerGyms,
    status: MutateStatus.Success,
    message: "ジムを登録しました！",
  };
};
