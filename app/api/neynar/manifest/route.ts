// app/api/neynar/manifest/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    id: "unit-conversion-game",
    name: "Unit Conversion Challenge",
    description: "Test your science skills in our fast-paced unit conversion game!",
    iconUrl: "https://unit-game-ruddy.vercel.app/icon.png",
    appUrl: "https://unit-game-ruddy.vercel.app/miniapp",
    permissions: [
      "cast"
    ],
    actions: [
      {
        type: "post",
        name: "Share Score",
        description: "Share your latest score with your followers.",
        actionUrl: "https://unit-game-ruddy.vercel.app/api/neynar/share"
      }
    ]
  });
}
