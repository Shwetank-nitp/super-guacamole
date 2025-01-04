import { Webhook } from "svix";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import UserModel from "@/model/user";
import connect2db from "@/lib/db/connect2db";
import TierModel from "@/model/tier";

async function POST(request: NextRequest) {
  try {
    const svix_wh = new Webhook(process.env.DELETE_ACCOUNT_CLERK_WEBHOOK!);

    const nextHeaders = await headers();
    const svix_id = nextHeaders.get("svix-id");
    const svix_timestamp = nextHeaders.get("svix-timestamp");
    const svix_signature = nextHeaders.get("svix-signature");

    if (!svix_id || !svix_signature || !svix_timestamp) {
      return NextResponse.json(
        { error: "request in is unauthorized" },
        { status: 401 }
      );
    }

    const payload = await request.json();
    const body = JSON.stringify(payload);

    try {
      svix_wh.verify(body, {
        "svix-id": svix_id,
        "svix-signature": svix_signature,
        "svix-timestamp": svix_timestamp,
      });
      await connect2db();
      const uid_clerk = payload.data.id;

      await Promise.all([
        UserModel.deleteOne({ uid_clerk }),
        TierModel.deleteOne({ uid_clerk }),
      ]);

      return NextResponse.json({ result: "user deleted" }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Unauthorized request" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "somthing went wrong!" },
      { status: 500 }
    );
  }
}

export { POST };
