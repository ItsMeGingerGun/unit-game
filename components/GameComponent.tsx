// components/GameComponent.tsx
'use client';
import { useState, useEffect } from 'react';

export default function GameComponent({
  farcasterUser,
  signerUuid,
  isMiniApp = false
}: {
  farcasterUser?: any;
  signerUuid?: string;
  isMiniApp?: boolean;
}) {
  const [difficulty, setDifficulty] = useState('easy');
  const [puzzle, setPuzzle] = useState<any>(null);
  
  // Your existing game logic here
  const startGame = async () => {
    // Include signerUuid for Mini App context
    const res = await fetch('/api/start-game', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ difficulty, fid: farcasterUser?.fid, signerUuid })
    });
    
    if (res.ok) {
      setPuzzle(await res.json());
    }
  };

  // Mini App specific styles
  return (
    <div className={`w-full ${isMiniApp ? 'h-full' : ''}`}>
      {/* Your game UI here */}
      {!puzzle ? (
        <div className="flex flex-col items-center p-4">
          <select 
            value={difficulty} 
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full max-w-xs p-3 mb-6 bg-gray-800 text-white rounded-lg"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          
          <button 
            onClick={startGame}
            className="w-full max-w-xs bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          >
            Start Game
          </button>
        </div>
      ) : (
        <div className="p-4">
          {/* Game content */}
        </div>
      )}
    </div>
  );
}
