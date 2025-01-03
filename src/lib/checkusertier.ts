import TierModel from "@/app/model/tier";
import connect2db from "./db/connect2db";

export const checkTier = async (uid_clerk: string) => {
  try {
    await connect2db();
    const userTier = await TierModel.findOne({ uid_clerk });

    if (!userTier) {
      throw new Error("user not found");
    }

    if (userTier.plan === "PRO") {
      return true;
    }

    if (userTier.usage === 0) {
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const manageTier = async (uid_clerk: string) => {
  try {
    await connect2db();
    const userTier = await TierModel.findOne({ uid_clerk });

    if (!userTier) {
      throw new Error("[manageTier] : user not found");
    }

    await TierModel.updateOne(
      { uid_clerk },
      {
        usage: userTier.usage > 0 ? userTier.usage - 1 : userTier.usage,
      }
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};
