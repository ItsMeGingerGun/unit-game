// app/frame/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { neynar } from '@neynar/nodejs-sdk';
import { generatePuzzle } from '@/lib/game';

export async function POST(req: NextRequest) {
  try {
    // Parse request data
    const body = await req.json();
    const trustedData = body.trustedData;
    const untrustedData = body.untrustedData;

    // Validate frame action
    const neynarClient = new neynar.ApiClient(process.env.NEYNAR_API_KEY!);
    const validation = await neynarClient.validateFrameAction(trustedData.messageBytes);
    
    // Extract validated data
    const buttonIndex = untrustedData.buttonIndex;
    const fid = untrustedData.fid;
    
    // State machine for frame actions
    if (buttonIndex === 1) {
      // Initial play button pressed
      return NextResponse.json({
        type: 'frame',
        frame: {
          version: 'vNext',
          image: `${process.env.NEXT_PUBLIC_BASE_URL}/difficulty-select.png`,
          buttons: [
            { label: 'Easy', action: 'post', target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame?step=difficulty&level=easy` },
            { label: 'Medium', action: 'post', target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame?step=difficulty&level=medium` },
            { label: 'Hard', action: 'post', target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame?step=difficulty&level=hard` },
            { label: 'Leaderboard', action: 'post_redirect', target: `${process.env.NEXT_PUBLIC_BASE_URL}/leaderboard` }
          ],
          postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame`,
        }
      });
    } 
    
    // Handle difficulty selection
    const step = req.nextUrl.searchParams.get('step');
    if (step === 'difficulty') {
      const difficulty = req.nextUrl.searchParams.get('level') || 'easy';
      const puzzle = generatePuzzle(difficulty);
      
      return NextResponse.json({
        type: 'frame',
        frame: {
          version: 'vNext',
          image: `${process.env.NEXT_PUBLIC_BASE_URL}/api/puzzle-image?text=${encodeURIComponent(puzzle.text)}&date=${Date.now()}`,
          input: { text: 'Enter your answer' },
          buttons: [{ label: 'Submit', action: 'post' }],
          postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/submit-frame-answer`,
          state: {
            difficulty,
            puzzleId: puzzle.id,
            fid
          }
        }
      });
    }

    // Fallback response
    return NextResponse.json({
      type: 'frame',
      frame: {
        version: 'vNext',
        image: `${process.env.NEXT_PUBLIC_BASE_URL}/game-preview.png`,
        buttons: [{ label: 'Play Again', action: 'post' }],
        postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame`,
      }
    });
    
  } catch (error) {
    console.error('Frame validation failed:', error);
    return NextResponse.json({
      type: 'frame',
      frame: {
        version: 'vNext',
        image: `${process.env.NEXT_PUBLIC_BASE_URL}/error.png`,
        buttons: [{ label: 'Try Again', action: 'post' }],
        postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame`,
      }
    });
  }
}

// Handle GET requests for initial frame
export async function GET(req: NextRequest) {
  return NextResponse.json({
    type: 'frame',
    frame: {
      version: 'vNext',
      image: `${process.env.NEXT_PUBLIC_BASE_URL}/game-preview.png`,
      buttons: [{ label: 'Play Unit Game', action: 'post' }],
      postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame`,
    }
  });
}
