import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Unit Conversion Game</h1>
      <Link href="/game">Start Playing</Link>
    </main>
  );
}
'use client';
import { useState, useEffect } from 'react';

export default function GamePage() {
  const [fid, setFid] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState('easy');
  const [puzzle, setPuzzle] = useState<any>(null);
  
  // Farcaster login via frames
  const farcasterLogin = () => {
    window.open(`https://warpcast.com/~/sign-in?appId=${process.env.NEXT_PUBLIC_APP_ID}`);
  };
  
  const startGame = async () => {
    const res = await fetch('/api/start-game', {
      method: 'POST',
      body: JSON.stringify({ difficulty, fid })
    });
    setPuzzle(await res.json());
  };
  
  return (
    <div>
      {!fid ? (
        <button onClick={farcasterLogin}>Login with Farcaster</button>
      ) : (
        <>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="easy">Easy (20s)</option>
            <option value="medium">Medium (15s)</option>
            <option value="hard">Hard (10s)</option>
          </select>
          <button onClick={startGame}>Start Game</button>
        </>
      )}
    </div>
  );
}
