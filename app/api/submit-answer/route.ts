import { redis } from '@/lib/redis'

export async function POST(req: Request) {
  const { sessionId, answer } = await req.json();
  const puzzle = await redis.get(`puzzle:${sessionId}`);
  
  if (!puzzle) return Response.json({ error: 'Session expired' }, { status: 400 });
  
  const data = JSON.parse(puzzle);
  const isCorrect = Math.abs(data.answer - parseFloat(answer)) < 0.01;
  
  if (isCorrect) {
    const points = data.timeLimit === 20 ? 1 : data.timeLimit === 15 ? 2 : 3;
    await redis.zincrby('leaderboard', points, data.fid);
  }
  
  return Response.json({ correct: isCorrect });
}
