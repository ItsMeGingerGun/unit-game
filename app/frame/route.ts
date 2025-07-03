// app/frame/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generatePuzzle } from '@/lib/game';

export async function POST(req: NextRequest) {
  // Parse Frame action data
  const body = await req.json();
  const buttonIndex = body.untrustedData.buttonIndex;
  const fid = body.untrustedData.fid;

  // Handle difficulty selection
  const difficulties = ['easy', 'medium', 'hard'];
  const difficulty = difficulties[buttonIndex - 1] || 'easy';

  // Generate puzzle
  const puzzle = generatePuzzle(difficulty);

  // Return Frame response
  return new NextResponse(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext">
        <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/puzzle-image?text=${encodeURIComponent(puzzle.text)}">
        <meta property="fc:frame:input:text" content="Enter your answer">
        <meta property="fc:frame:button:1" content="Submit">
        <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/submit-frame-answer">
        <meta property="fc:frame:state" content='{"difficulty":"${difficulty}","puzzleId":"${puzzle.id}","fid":"${fid}"}'>
      </head>
    </html>
  `, {
    status: 200,
    headers: { 'Content-Type': 'text/html' }
  });
}
