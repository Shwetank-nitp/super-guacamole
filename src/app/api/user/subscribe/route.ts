import TierModel from "@/app/model/tier";
import connect2db from "@/lib/db/connect2db";
import { NextRequest, NextResponse } from "next/server";

const MS_IN_DAY = 8_64_00_000;

export async function POST(reqest: NextRequest) {
  try {
    const { uid_clerk, title } = await reqest.json();

    if (!uid_clerk) {
      return NextResponse.json(
        { error: "user id missing in request body" },
        { status: 400 }
      );
    }

    if (!title || typeof title !== "string") {
      return NextResponse.json(
        { error: "title is missing in request body" },
        { status: 400 }
      );
    }

    await connect2db();

    const tier = await TierModel.findOne({ uid_clerk });

    if (!tier) {
      return NextResponse.json(
        { error: "user dose not exist in database" },
        { status: 404 }
      );
    }

    if (
      tier.plan === "PRO" &&
      tier.subscription_end_data.getTime() > Date.now()
    ) {
      return NextResponse.json(
        { error: "User already has an existing plan!" },
        { status: 410 }
      );
    }

    let days;

    if (title.toUpperCase() === "SILVER") {
      days = Date.now().valueOf() + MS_IN_DAY * 30;
    } else if (title.toUpperCase() === "GOLD") {
      days = Date.now().valueOf() + MS_IN_DAY * 30 * 3;
    } else if (title.toUpperCase() === "PLATINIUM") {
      days = Date.now().valueOf() + MS_IN_DAY * 30 * 6;
    } else {
      return NextResponse.json(
        { error: `plan name ${title} dose not exist` },
        { status: 404 }
      );
    }

    const updateUserTier = await TierModel.updateOne(
      { uid_clerk },
      {
        $set: {
          subscription_end_data: days,
          tier_name: title,
          plan: "PRO",
          usage: -1,
        },
      }
    );

    if (!updateUserTier) {
      return NextResponse.json(
        {
          error:
            "Somting went wrong white updateing the data base we will try again later",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ result: "ok" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Server error, we are try to fix it" },
      { status: 500 }
    );
  }
}
