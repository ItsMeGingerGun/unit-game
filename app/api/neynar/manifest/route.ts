// app/api/neynar/manifest/route.ts
import { getConfig } from '@/lib/config';
import { NextResponse } from 'next/server';

export async function GET() {
  const config = getConfig();
  return NextResponse.json({
    id: "unit-conversion-game",
    name: "Unit Conversion Challenge",
    description: "Test your science skills in our fast-paced unit conversion game!",
    iconUrl: `${config.baseUrl}/icon.png`,
    appUrl: `${config.baseUrl}/miniapp`,
    permissions: ["cast"],
    actions: [{
      type: "post",
      name: "Share Score",
      description: "Share your latest score with your followers.",
      actionUrl: `${config.baseUrl}/api/neynar/share`
    }]
  });
}
