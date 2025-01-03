import { checkTier, manageTier } from "@/lib/checkusertier";
import generateResponse from "@/lib/model-apis/conversation/text2textgenerationapi";
import { marked } from "marked";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { query, uid_clerk } = await request.json();
    if (!query || !uid_clerk) {
      return NextResponse.json(
        { error: "query or uid_ is required/invalid" },
        { status: 400 }
      );
    }

    const check_tier = await checkTier(uid_clerk);

    if (!check_tier) {
      return NextResponse.json(
        {
          error:
            "Cannot full fill you request, upgrade to pro plan to continue usage",
        },
        { status: 410 }
      );
    }

    const response = await generateResponse(query);
    if (!response) {
      return NextResponse.json(
        { error: "somthing went wrong" },
        { status: 500 }
      );
    }

    const html = marked(response.content!);

    await manageTier(uid_clerk);

    return NextResponse.json(
      {
        result: {
          role: response.role,
          content: html,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        result: "conversation service is down, please try again later.",
      },
      { status: 500 }
    );
  }
}
