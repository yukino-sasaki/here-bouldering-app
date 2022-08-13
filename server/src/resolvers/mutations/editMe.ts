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

  const findgym = await Gym.find({
    $or: [
      {
        "creater.userId": id,
      },
      {
        climbingUser: {
          $elemMatch: {
            userId: id,
          },
        },
      },
    ],
  });
  console.log("test", findgym);

  const editGym = await Gym.updateMany(
    {
      $or: [
        {
          "creater.userId": id,
        },
        {
          climbingUser: {
            $elemMatch: {
              userId: id,
            },
          },
        },
      ],
    },
    {
      $set: {
        "creater.nickname": nickname,
        "climbingUser.$[].nickname": nickname,
      },
    },
    {
      new: true,
    }
  );
  console.log("edit", editGym);

  return {
    me: updateMe,
    message: "ユーザー情報をアップデートしました！",
    status: MutateStatus.Success,
  };
};
