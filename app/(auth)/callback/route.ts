import { NeynarAPIClient } from '@neynar/nodejs-sdk';

export async function POST(req: Request) {
  try {
    const { messageBytes } = await req.json();
    
    if (!process.env.NEYNAR_API_KEY) {
      throw new Error('Neynar API key not configured');
    }

    const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY);
    
    // Correct method name is verifyFrameAction
    const result = await client.verifyFrameAction(messageBytes);
    
    if (!result.valid) {
      return Response.json({ error: 'Invalid signature' }, { status: 401 });
    }

    return Response.json({ fid: result.action?.interactor.fid || '' });
  } catch (error) {
    console.error('Farcaster login error:', error);
    return Response.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
