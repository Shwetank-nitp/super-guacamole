import TierModel from "@/app/model/tier";
import connect2db from "@/lib/db/connect2db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { uid_clerk } = await request.json();

    if (!uid_clerk) {
      return NextResponse.json(
        { error: "user id is missing : provide ui_clerk in body of request" },
        { status: 400 }
      );
    }

    await connect2db();

    const usertier = await TierModel.findOne({ uid_clerk });

    if (!usertier) {
      return NextResponse.json(
        { error: "user dose not exist in database" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        result: {
          usage: usertier.usage,
          plan: usertier.plan,
          title: usertier.tier_name,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "server error please try again later" },
      { status: 500 }
    );
  }
}
