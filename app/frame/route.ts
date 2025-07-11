// app/frame/route.ts
import { NextResponse } from 'next/server';
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
    const username = untrustedData.username;
    const pfp = untrustedData.pfp;
    
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
            { label: 'Miniapp', action: 'post_redirect', target: `${process.env.NEXT_PUBLIC_BASE_URL}/miniapp?fid=${fid}&username=${username}&pfp=${pfp}` }
          ],
          postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame`,
        }
      });
    } 
    
    // ... rest of the frame logic ...
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
