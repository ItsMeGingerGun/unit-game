// app/game/page.tsx
'use client';
import { useState } from 'react';

export default function GamePage() {
  const [fid, setFid] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState('easy');
  const [puzzle, setPuzzle] = useState<any>(null);
  
  const farcasterLogin = () => {
    window.open(`https://warpcast.com/~/sign-in?appId=${process.env.NEXT_PUBLIC_APP_ID}`);
  };
  
  const startGame = async () => {
    const res = await fetch('/api/start-game', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ difficulty, fid })
    });
    
    if (!res.ok) {
      console.error('Failed to start game', await res.text());
      return;
    }
    
    setPuzzle(await res.json());
  };
  
  return (
    <div className="max-w-md mx-auto p-6">
      {!fid ? (
        <button 
          onClick={farcasterLogin}
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Login with Farcaster
        </button>
      ) : (
        <div className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">Difficulty:</label>
            <select 
              value={difficulty} 
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full p-3 border rounded-lg"
            >
              <option value="easy">Easy (20s)</option>
              <option value="medium">Medium (15s)</option>
              <option value="hard">Hard (10s)</option>
            </select>
          </div>
          
          <button 
            onClick={startGame}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Start Game
          </button>
          
          {puzzle && (
            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Current Puzzle</h2>
              <p className="text-2xl text-center">{puzzle.text}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
