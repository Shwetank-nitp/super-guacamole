import TierModel from "@/model/tier";
import UserModel from "@/model/user";
import connect2db from "@/lib/db/connect2db";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";

async function POST(request: NextRequest) {
  try {
    const signature = process.env.SIGNIN_SECRET_CLERK_WEBHOOK!;

    const svix_wh = new Webhook(signature);

    // request headers
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

    // Verify payload with headers
    try {
      svix_wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;

      await connect2db();

      const email: string[] = payload.data.email_addresses.map(
        (item: (typeof payload.data.email_addresses)[0]) => item.email_address
      );

      const uid_clerk = payload.data.id;
      const name = payload.data.first_name + " " + payload.data.last_name;
      const createUser = UserModel.create({
        email,
        uid_clerk,
        name,
      });

      const createTier = TierModel.create({
        uid_clerk,
      });

      await Promise.all([createTier, createUser]);

      if (!createUser || !createTier) {
        throw new Error("somthing went wrong, user not saved in database");
      }

      return NextResponse.json(
        { result: "user create successfully" },
        { status: 200 }
      );
    } catch (err) {
      console.error("Error: Could not verify webhook:", err);
      return new Response("Error: Verification error", {
        status: 400,
      });
    }
  } catch (error) {
    console.log(error);
    NextResponse.json({ result: "somthing went wrong!" }, { status: 500 });
  }
}

export { POST };
