// app/(auth)/callback/route.ts
import { NeynarAPIClient } from '@neynar/nodejs-sdk';

export async function POST(req: Request) {
  try {
    const { messageBytes } = await req.json();
    
    if (!process.env.NEYNAR_API_KEY) {
      throw new Error('Neynar API key not configured');
    }

    const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY);
    const result = await client.validateFrameAction(messageBytes);
    
    if (!result.valid) {
      return Response.json({ error: 'Invalid signature' }, { status: 401 });
    }

    return Response.json({ fid: result.interactor.fid });
  } catch (error) {
    console.error('Farcaster login error:', error);
    return Response.json(
      { error: 'Could not authenticate with Farcaster' },
      { status: 500 }
    );
  }
}
