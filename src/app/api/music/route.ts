import { checkTier, manageTier } from "@/lib/checkusertier";
import musicGeneration from "@/lib/model-apis/music/text2audioapi";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { query, uid_clerk } = await request.json();

    if (!query || typeof query !== "string" || !uid_clerk) {
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

    if (!check_tier) {
      return NextResponse.json(
        {
          error:
            "Cannot full fill you request, upgrade to pro plan to continue usage",
        },
        { status: 410 }
      );
    }

    const resblob = await musicGeneration(query);

    await manageTier(uid_clerk);

    return new NextResponse(resblob, { status: 200 });
  } catch (error) {
    console.log("[ERROR IN MUSIC GENERATION API] : ", error);
    return NextResponse.json(
      { error: "our music generation service is down." },
      { status: 500 }
    );
  }
}
