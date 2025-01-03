import { checkusertierapi } from "@/lib/api_routes/_routes";
import { checkTier, manageTier } from "@/lib/checkusertier";
import imageGeneration from "@/lib/model-apis/image/imagegenerationapi";
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

    const imageblob = await imageGeneration(query);

    await manageTier(uid_clerk);

    return new NextResponse(imageblob, {
      headers: {
        "Content-Type": "image/jpeg",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "sorry cannot fetch you request, try again later",
      },
      { status: 500 }
    );
  }
}
