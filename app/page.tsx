// app/page.tsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaClock, FaTrophy, FaArrowRight } from 'react-icons/fa';

export default function LandingPage() {
  const [activeUnit, setActiveUnit] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');
  const [playerCount, setPlayerCount] = useState(1284);
  const [solvedCount, setSolvedCount] = useState(35892);
  const [isLoading, setIsLoading] = useState(true);

  const unitExamples = [
    { from: 'kg', to: 'g', value: 1.5, answer: 1500 },
    { from: 'mm', to: 'm', value: 2500, answer: 2.5 },
    { from: 'ml', to: 'L', value: 750, answer: 0.75 },
  ];

  const leaderboardPreview = [
    { name: 'farcaster.eth', score: 2480 },
    { name: 'unitmaster', score: 1985 },
    { name: 'conversionqueen', score: 1750 },
  ];

  // Auto-rotate unit examples
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUnit(prev => (prev + 1) % unitExamples.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [unitExamples.length]);

  // Animated counters
  useEffect(() => {
    const playerInterval = setInterval(() => {
      setPlayerCount(prev => prev + 1);
    }, 5000);
    
    const solvedInterval = setInterval(() => {
      setSolvedCount(prev => prev + 5);
    }, 2000);
    
    return () => {
      clearInterval(playerInterval);
      clearInterval(solvedInterval);
    };
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600 z-50">
        <div className="w-16 h-16 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
          Unit Conversion Challenge
        </h1>
        
        <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Test your science skills in our fast-paced unit conversion game! 
          Compete globally and climb the leaderboard.
        </p>
        
        <div className="mt-8">
          <Link 
            href="/miniapp" 
            className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:from-purple-700 hover:to-indigo-700"
          >
            Play Now
          </Link>
        </div>
        
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <div className="bg-white p-4 rounded-xl shadow-lg text-center min-w-[160px]">
            <div className="text-3xl font-bold text-purple-600">{playerCount}+</div>
            <div className="text-gray-600 mt-1">Players</div>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-lg text-center min-w-[160px]">
            <div className="text-3xl font-bold text-indigo-600">{solvedCount}+</div>
            <div className="text-gray-600 mt-1">Conversions</div>
          </div>
        </div>
      </div>
      
      {/* Interactive Demo */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">How It Works</h2>
            
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1 w-full">
                <div className="bg-gray-100 rounded-xl p-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gray-800 min-h-[120px] flex items-center justify-center">
                    _____ {unitExamples[activeUnit].to} = {unitExamples[activeUnit].value} {unitExamples[activeUnit].from}
                  </div>
                  
                  <div className="mt-6">
                    <div className="flex justify-center space-x-3 mb-4">
                      {['easy', 'medium', 'hard'].map((level) => (
                        <button
                          key={level}
                          onClick={() => setDifficulty(level)}
                          className={`px-3 py-1.5 text-sm md:px-4 md:py-2 md:text-base rounded-full font-medium ${
                            difficulty === level
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </button>
                      ))}
                    </div>
                    
                    <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`absolute top-0 left-0 h-full bg-purple-600 transition-all duration-500 ${
                          difficulty === 'easy' ? 'w-1/3' : 
                          difficulty === 'medium' ? 'w-2/3' : 'w-full'
                        }`}
                      />
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      Time: {difficulty === 'easy' ? '20s' : difficulty === 'medium' ? '15s' : '10s'}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 w-full">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Features</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-purple-100 text-purple-600 rounded-full p-1 mr-3 mt-1">
                      <FaClock className="h-4 w-4" />
                    </div>
                    <span>Timed challenges with 3 difficulty levels</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-purple-100 text-purple-600 rounded-full p-1 mr-3 mt-1">
                      <FaTrophy className="h-4 w-4" />
                    </div>
                    <span>Global leaderboard competition</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-purple-100 text-purple-600 rounded-full p-1 mr-3 mt-1">
                      <FaTrophy className="h-4 w-4" />
                    </div>
                    <span>Seamless Farcaster miniapp integration</span>
                  </li>
                </ul>
                
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Top Players</h3>
                  <div className="space-y-3">
                    {leaderboardPreview.map((player, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center">
                          <div className="text-gray-500 mr-3 w-6 text-center">{index + 1}</div>
                          <div className="font-medium">{player.name}</div>
                        </div>
                        <div className="font-bold text-purple-600">{player.score}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-right">
                    <Link href="/leaderboard" className="text-purple-600 hover:underline flex items-center justify-end">
                      View full leaderboard <FaArrowRight className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">Why Players Love It</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-transform hover:-translate-y-1">
            <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaClock className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Fast-Paced Gameplay</h3>
            <p className="text-gray-600">Test your skills against the clock with exciting timed challenges.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-transform hover:-translate-y-1">
            <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaTrophy className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Global Competition</h3>
            <p className="text-gray-600">Climb the leaderboard and compete with players worldwide.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-transform hover:-translate-y-1">
            <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaTrophy className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Miniapp Integration</h3>
            <p className="text-gray-600">Play directly within Farcaster with automatic login.</p>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready for the Challenge?</h2>
          <p className="text-lg text-purple-100 mb-6">
            Join thousands of players mastering unit conversions in our competitive game.
          </p>
          <Link 
            href="/miniapp" 
            className="inline-block bg-white text-purple-600 font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-gray-100 transition-all duration-300"
          >
            Start Playing Now
          </Link>
          <div className="mt-4 text-purple-200 text-sm">
            No installation needed • Play directly in Farcaster
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-xl font-bold mb-4">UnitGame</div>
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <a href="#" className="hover:text-purple-400 transition-colors">About</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Leaderboard</a>
            <a href="#" className="hover:text-purple-400 transition-colors">FAQ</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Contact</a>
          </div>
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Unit Conversion Challenge. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
