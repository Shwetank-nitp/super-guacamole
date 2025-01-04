import TierModel from "@/app/model/tier";
import connect2db from "@/lib/db/connect2db";
import { NextRequest, NextResponse } from "next/server";

const MS_IN_DAY = 8_64_00_000;

export async function POST(request: NextRequest) {
  try {
    const { uid_clerk, title } = await request.json();

    if (!uid_clerk) {
      return NextResponse.json(
        { error: "User ID is missing in request body" },
        { status: 400 }
      );
    }

    if (!title || typeof title !== "string") {
      return NextResponse.json(
        { error: "Title is missing or invalid in request body" },
        { status: 400 }
      );
    }

    const name_of_plan = title.toLowerCase();

    await connect2db();

    const tier = await TierModel.findOne({ uid_clerk });

    if (!tier) {
      return NextResponse.json(
        { error: "User does not exist in the database" },
        { status: 404 }
      );
    }

    if (
      tier.plan === "PRO" &&
      tier.subscription_end_date &&
      tier.subscription_end_date.getTime() > Date.now()
    ) {
      return NextResponse.json(
        { error: "User already has an existing plan!" },
        { status: 410 }
      );
    }

    let days: Date;

    switch (name_of_plan) {
      case "silver":
        days = new Date(Date.now() + MS_IN_DAY * 30);
        break;
      case "gold":
        days = new Date(Date.now() + MS_IN_DAY * 90);
        break;
      case "platinum":
        days = new Date(Date.now() + MS_IN_DAY * 180);
        break;
      default:
        return NextResponse.json(
          { error: "Name of the plan is invalid" },
          { status: 400 }
        );
    }

    const updateUserTier = await TierModel.updateOne(
      { uid_clerk },
      {
        $set: {
          subscription_end_date: days,
          name_of_plan,
          plan: "PRO",
          usage: -1,
        },
      }
    );

    if (!updateUserTier || updateUserTier.modifiedCount === 0) {
      return NextResponse.json(
        {
          error:
            "Something went wrong while updating the database. Try again later.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ result: "ok" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Server error, we are trying to fix it" },
      { status: 500 }
    );
  }
}
