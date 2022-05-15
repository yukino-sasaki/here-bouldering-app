import { MutateStatus, MutationResolvers } from "../../generated/graphql";
import Gym from "../../models/gyms";
import User from "../../models/user";

export const editMe: MutationResolvers["editMe"] = async (
  _,
  { input },
  { id }
) => {
  const { nickname, avatarImage } = input;
  const updateMe = await User.findOneAndUpdate(
    {
      userId: id,
    },
    {
      $set: {
        nickname,
        avatarImage,
      },
    },
    {
      new: true,
    }
  );

  await Gym.updateMany(
    {
      "creater.userId": id,
    },
    {
      $set: {
        "creater.nickname": nickname,
        "creater.avatarImage": avatarImage,
      },
    },
    {
      new: true,
    }
  );

  return {
    me: updateMe,
    message: "ユーザー情報をアップデートしました！",
    status: MutateStatus.Success,
  };
};
