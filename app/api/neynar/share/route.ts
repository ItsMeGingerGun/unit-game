// app/api/neynar/share/route.ts
import { NextResponse } from 'next/server';
import { neynar } from "@neynar/nodejs-sdk";

export async function POST(request: Request) {
  const { score, userFid } = await request.json();
  
  try {
    const neynarClient = new neynar.ApiClient(
      process.env.NEYNAR_API_KEY!
    );

    const result = await neynarClient.publishCast(
      process.env.SIGNER_UUID!,
      `Just scored ${score} points in Unit Conversion Challenge! 🔥 Try to beat me!\n\nPlay at: ${process.env.NEXT_PUBLIC_BASE_URL}`,
      {
        embeds: [
          { url: `${process.env.NEXT_PUBLIC_BASE_URL}/miniapp` }
        ],
        channelId: "unit-conversion"
      }
    );

    return NextResponse.json({ success: true, cast: result });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Sharing failed' }, { status: 500 });
  }
}
