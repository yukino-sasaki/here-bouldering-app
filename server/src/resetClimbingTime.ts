import Gym from "./models/gyms";
import User from "./models/user";

export const resetClimbingTime = async () => {
  console.log("execute node cron function");
  await User.updateMany(
    {},
    {
      $set: {
        climbingTime: [],
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
    }
  );
};
