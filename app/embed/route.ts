import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fid = searchParams.get('fid');
  const username = searchParams.get('username');
  const pfp = searchParams.get('pfp');

  return NextResponse.json({
    version: "1.0",
    title: "Unit Conversion Challenge",
    description: "Test your science skills in our fast-paced unit conversion game!",
    image: "https://unit-game-ruddy.vercel.app/embed-image.png",
    redirectUrl: `https://unit-game-ruddy.vercel.app/miniapp?fid=${fid}&username=${username}&pfp=${pfp}`
  });
}
