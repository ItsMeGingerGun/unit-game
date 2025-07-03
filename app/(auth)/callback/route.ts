import { neynar } from '@/lib/neynar'

export async function POST(req: Request) {
  const { messageBytes } = await req.json();
  const result = await neynar.validateFrameAction(messageBytes);
  return Response.json({ fid: result.interactor.fid });
}
