import { MutateStatus, MutationResolvers } from "../../generated/graphql";
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
  return {
    me: updateMe,
    message: "ユーザー情報をアップデートしました！",
    status: MutateStatus.Success,
  };
};
