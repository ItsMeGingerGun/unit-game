// app/page.tsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const [activeUnit, setActiveUnit] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');
  const [isAnimating, setIsAnimating] = useState(true);
  const [playerCount, setPlayerCount] = useState(1284);
  const [solvedCount, setSolvedCount] = useState(35892);

  // Demo unit conversion examples
  const unitExamples = [
    { from: 'kg', to: 'g', value: 1.5, answer: 1500 },
    { from: 'mm', to: 'm', value: 2500, answer: 2.5 },
    { from: 'ml', to: 'L', value: 750, answer: 0.75 },
    { from: 'mg', to: 'g', value: 450, answer: 0.45 },
  ];

  // Leaderboard preview
  const leaderboardPreview = [
    { name: 'farcaster.eth', score: 2480 },
    { name: 'unitmaster', score: 1985 },
    { name: 'conversionqueen', score: 1750 },
    { name: 'sciencenerd', score: 1620 },
    { name: 'newplayer', score: 1205 },
  ];

  // Animation for unit conversion examples
  useEffect(() => {
    const interval = setInterval(() => {
      if (isAnimating) {
        setActiveUnit((prev) => (prev + 1) % unitExamples.length);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isAnimating]);

  // Stats animation
  useEffect(() => {
    const playerInterval = setInterval(() => {
      setPlayerCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    
    const solvedInterval = setInterval(() => {
      setSolvedCount(prev => prev + Math.floor(Math.random() * 10));
    }, 2000);
    
    return () => {
      clearInterval(playerInterval);
      clearInterval(solvedInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <motion.h1 
          className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Unit Conversion Challenge
        </motion.h1>
        
        <motion.p 
          className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Test your science skills with our fast-paced unit conversion game! 
          Compete against players worldwide and climb the leaderboard.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10"
        >
          <Link 
            href="/game" 
            className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Play Now
          </Link>
        </motion.div>
        
        <div className="mt-16 flex flex-wrap justify-center gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center min-w-[200px]">
            <div className="text-4xl font-bold text-purple-600">{playerCount}+</div>
            <div className="text-gray-600 mt-2">Players</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg text-center min-w-[200px]">
            <div className="text-4xl font-bold text-indigo-600">{solvedCount}+</div>
            <div className="text-gray-600 mt-2">Conversions</div>
          </div>
        </div>
      </div>
      
      {/* Interactive Demo */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How It Works</h2>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <div 
                  className="bg-gray-100 rounded-xl p-8 text-center relative overflow-hidden"
                  onMouseEnter={() => setIsAnimating(false)}
                  onMouseLeave={() => setIsAnimating(true)}
                >
                  <motion.div
                    key={activeUnit}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-5xl font-bold text-gray-800"
                  >
                    _____ {unitExamples[activeUnit].to} = {unitExamples[activeUnit].value} {unitExamples[activeUnit].from}
                  </motion.div>
                  
                  <div className="mt-6">
                    <div className="flex justify-center space-x-4 mb-4">
                      {['easy', 'medium', 'hard'].map((level) => (
                        <button
                          key={level}
                          onClick={() => setDifficulty(level)}
                          className={`px-4 py-2 rounded-full font-medium ${
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
                      <motion.div 
                        className="absolute top-0 left-0 h-full bg-purple-600"
                        initial={{ width: 0 }}
                        animate={{ width: difficulty === 'easy' ? '33%' : difficulty === 'medium' ? '66%' : '100%' }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      Time: {difficulty === 'easy' ? '20s' : difficulty === 'medium' ? '15s' : '10s'}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Challenge Yourself</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-purple-100 text-purple-600 rounded-full p-1 mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Three difficulty levels to test your skills</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-purple-100 text-purple-600 rounded-full p-1 mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Compete on the global leaderboard</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-purple-100 text-purple-600 rounded-full p-1 mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Login with Farcaster to save your progress</span>
                  </li>
                </ul>
                
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Leaderboard Preview</h3>
                  <div className="space-y-3">
                    {leaderboardPreview.map((player, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center">
                          <div className="text-gray-500 mr-3 w-6 text-center">{index + 1}</div>
                          <div className="font-medium">{player.name}</div>
                        </div>
                        <div className="font-bold text-purple-600">{player.score} pts</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Players Love Our Game</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            className="bg-white p-8 rounded-xl shadow-lg text-center"
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Fast-Paced Challenges</h3>
            <p className="text-gray-600">Test your skills against the clock with timed challenges that get progressively harder.</p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-8 rounded-xl shadow-lg text-center"
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Global Leaderboard</h3>
            <p className="text-gray-600">Compete with players worldwide and see your name at the top of the rankings.</p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-8 rounded-xl shadow-lg text-center"
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Login</h3>
            <p className="text-gray-600">Connect with Farcaster to securely save your progress and achievements.</p>
          </motion.div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Test Your Skills?</h2>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto mb-8">
            Join thousands of players mastering unit conversions in our fast-paced, competitive game.
          </p>
          <Link 
            href="/game" 
            className="inline-block bg-white text-purple-600 font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300"
          >
            Play Now
          </Link>
          <div className="mt-6 text-purple-200">
            No installation required • Play directly in your browser
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold mb-6 md:mb-0">UnitGame</div>
            <div className="flex space-x-8">
              <a href="#" className="hover:text-purple-400 transition-colors">About</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Leaderboard</a>
              <a href="#" className="hover:text-purple-400 transition-colors">FAQ</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Unit Conversion Challenge. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
