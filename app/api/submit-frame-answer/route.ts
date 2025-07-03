// app/api/submit-frame-answer/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { untrustedData, trustedData } = body;
  
  // Parse state
  const state = JSON.parse(untrustedData.state);
  const { difficulty, puzzleId, fid } = state;
  const userAnswer = untrustedData.inputText;

  // Validate answer (pseudo-code)
  const isCorrect = await validateAnswer(puzzleId, userAnswer);

  // Update leaderboard
  if (isCorrect) {
    const points = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3;
    await redis.zincrby('leaderboard', points, fid);
  }

  // Return result Frame
  return new NextResponse(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext">
        <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/result-image?correct=${isCorrect}">
        <meta property="fc:frame:button:1" content="Play Again">
        <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/frame">
      </head>
    </html>
  `, {
    status: 200,
    headers: { 'Content-Type': 'text/html' }
  });
}
