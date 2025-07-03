import { generatePuzzle } from '@/lib/game'
import { redis } from '@/lib/redis'

export async function POST(req: Request) {
  const { difficulty, fid } = await req.json();
  const puzzle = generatePuzzle(difficulty);
  
  await redis.setex(`puzzle:${puzzle.id}`, puzzle.timeLimit, JSON.stringify({
    ...puzzle,
    fid
  }));
  
  return Response.json(puzzle);
}
