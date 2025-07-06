// app/miniapp/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaTrophy, FaShareAlt, FaRedo } from 'react-icons/fa';

export default function MiniAppPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [fid, setFid] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0);

  // Extract Farcaster context from query parameters
  useEffect(() => {
    const fidParam = searchParams.get('fid');
    const usernameParam = searchParams.get('username');
    const pfpParam = searchParams.get('pfp');

    if (fidParam) {
      setFid(fidParam);
      setUserData({
        fid: fidParam,
        username: usernameParam || 'Anonymous',
        pfp_url: pfpParam || '/default-avatar.png'
      });
      setIsLoading(false);
    } else {
      setError('Farcaster user context not found');
      setIsLoading(false);
    }
  }, [searchParams]);

  // Generate new question
  const generateQuestion = () => {
    const units = [
      { from: 'kg', to: 'g', factor: 1000 },
      { from: 'm', to: 'cm', factor: 100 },
      { from: 'km', to: 'm', factor: 1000 },
      { from: 'L', to: 'mL', factor: 1000 },
      { from: 'hour', to: 'min', factor: 60 },
    ];
    
    const randomUnit = units[Math.floor(Math.random() * units.length)];
    const value = (Math.random() * 10 + 1).toFixed(2);
    const answer = (parseFloat(value) * randomUnit.factor).toFixed(2);
    
    setCurrentQuestion({
      from: randomUnit.from,
      to: randomUnit.to,
      value,
      answer
    });
    setUserAnswer('');
  };

  // Start game
  const startGame = () => {
    setScore(0);
    setCorrectAnswers(0);
    setTimeLeft(20);
    setGameState('playing');
    generateQuestion();
  };

  // Handle answer submission
  const handleSubmit = () => {
    if (!currentQuestion) return;
    
    if (Math.abs(parseFloat(userAnswer) - parseFloat(currentQuestion.answer)) < 0.01) {
      setScore(prev => prev + 100);
      setCorrectAnswers(prev => prev + 1);
    }
    
    generateQuestion();
  };

  // Game timer
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameState('finished');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameState]);

  // Share score
  const shareScore = async () => {
    try {
      const response = await fetch('/api/neynar/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score, userFid: fid })
      });
      
      const result = await response.json();
      if (result.success) {
        alert('Score shared successfully!');
      }
    } catch (err) {
      console.error('Sharing failed:', err);
    }
  };

  // Redirect to game page
  const redirectToGame = () => {
    router.push(`/game?fid=${fid}`);
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 to-indigo-800">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-t-4 border-purple-300 rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-800 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-white mb-4">Error</h2>
          <p className="text-purple-200 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-800 p-4 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pt-4">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">
            Unit Game
          </h1>
          
          {userData && (
            <div className="flex items-center space-x-2">
              <img 
                src={userData.pfp_url} 
                alt={userData.username} 
                className="w-10 h-10 rounded-full border-2 border-purple-500"
              />
              <span className="text-white font-medium">{userData.username}</span>
            </div>
          )}
        </div>
        
        {/* Game Content */}
        <div className="flex-1 flex flex-col">
          {gameState === 'idle' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full">
                <h2 className="text-2xl font-bold text-center text-white mb-4">
                  Unit Conversion Challenge
                </h2>
                <p className="text-purple-200 text-center mb-8">
                  Convert units as fast as you can! Earn points for correct answers.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                      <FaTrophy className="text-white" />
                    </div>
                    <p className="text-white">100 points per correct answer</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                      <FaRedo className="text-white" />
                    </div>
                    <p className="text-white">20 seconds per game</p>
                  </div>
                </div>
                
                <button
                  onClick={redirectToGame}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
                >
                  Start Game
                </button>
              </div>
            </motion.div>
          )}
          
          {/* ... rest of the miniapp code remains unchanged ... */}
        </div>
      </div>
    </div>
  );
}
