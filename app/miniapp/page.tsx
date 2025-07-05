// app/miniapp/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { neynar } from "@neynar/nodejs-sdk";
import { motion } from 'framer-motion';
import { FaTrophy, FaShareAlt, FaRedo } from 'react-icons/fa';

export default function MiniAppPage() {
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

  // Extract Farcaster context
  useEffect(() => {
    const fidParam = searchParams.get('fid');
    if (fidParam) setFid(fidParam);
  }, [searchParams]);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!fid) return;
      
      try {
        const neynarClient = new neynar.ApiClient(
          process.env.NEXT_PUBLIC_NEYNAR_API_KEY!
        );
        
        const response = await neynarClient.fetchBulkUsers([parseInt(fid)]);
        if (response.users && response.users.length > 0) {
          setUserData(response.users[0]);
        }
      } catch (err) {
        console.error('Failed to fetch user data:', err);
        setError('Failed to load player profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [fid]);

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
                  onClick={startGame}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
                >
                  Start Game
                </button>
              </div>
            </motion.div>
          )}
          
          {gameState === 'playing' && currentQuestion && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex flex-col"
            >
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-purple-200 font-medium">Score: {score}</span>
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full">
                    {timeLeft}s
                  </div>
                </div>
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
                    initial={{ width: '100%' }}
                    animate={{ width: `${(timeLeft / 20) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white text-center mb-6">
                  Convert the value:
                </h3>
                
                <div className="bg-black/20 rounded-xl p-6 mb-8">
                  <p className="text-3xl font-bold text-white text-center">
                    {currentQuestion.value} {currentQuestion.from} = ? {currentQuestion.to}
                  </p>
                </div>
                
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="bg-black/20 border border-purple-500 rounded-xl p-4 text-white text-center text-xl mb-6 w-full"
                  placeholder="Enter your answer"
                  autoFocus
                />
                
                <button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
                >
                  Submit Answer
                </button>
              </div>
            </motion.div>
          )}
          
          {gameState === 'finished' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full">
                <h2 className="text-2xl font-bold text-center text-white mb-2">
                  Game Over!
                </h2>
                <p className="text-purple-200 text-center mb-8">
                  Your final score
                </p>
                
                <div className="text-center mb-8">
                  <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">
                    {score}
                  </div>
                  <p className="text-white mt-2">
                    {correctAnswers} correct conversions
                  </p>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={startGame}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-xl"
                  >
                    Play Again
                  </button>
                  
                  <button
                    onClick={shareScore}
                    className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-3 rounded-xl flex items-center justify-center"
                  >
                    <FaShareAlt className="mr-2" /> Share
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Footer */}
        <div className="py-4 text-center text-purple-300 text-sm">
          Unit Conversion Challenge • Built on Farcaster
        </div>
      </div>
    </div>
  );
}
