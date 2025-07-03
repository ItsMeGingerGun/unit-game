'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { neynar } from "@neynar/nodejs-sdk";
import GameComponent from '@/components/GameComponent';
import { motion } from 'framer-motion';

export default function MiniAppPage() {
  const searchParams = useSearchParams();
  const [fid, setFid] = useState<string | null>(null);
  const [signerUuid, setSignerUuid] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extract Farcaster context from URL parameters
  useEffect(() => {
    const fidParam = searchParams.get('fid');
    const signerParam = searchParams.get('signer_uuid');
    
    if (fidParam) setFid(fidParam);
    if (signerParam) setSignerUuid(signerParam);
  }, [searchParams]);

  // Fetch user data when FID is available
  useEffect(() => {
    const fetchUserData = async () => {
      if (!fid) return;
      
      try {
        setIsLoading(true);
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

  // Mini App specific UI
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-t-4 border-blue-500 rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-black p-4 text-center">
        <div className="text-red-500 text-xl mb-4">⚠️ {error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-black">
      {/* Mini App Header */}
      <div className="absolute top-0 left-0 right-0 p-3 bg-black/80 backdrop-blur-sm z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {userData?.pfp_url && (
              <img 
                src={userData.pfp_url} 
                alt={userData.username}
                className="w-8 h-8 rounded-full mr-2"
              />
            )}
            <span className="text-white font-bold">
              {userData?.username || `FID: ${fid}`}
            </span>
          </div>
          <span className="text-green-500 font-semibold">Unit Game</span>
        </div>
      </div>

      {/* Game Component */}
      <div className="w-full h-full pt-12">
        {fid && signerUuid ? (
          <GameComponent 
            farcasterUser={userData} 
            signerUuid={signerUuid} 
            isMiniApp={true}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <h2 className="text-white text-xl mb-4">Farcaster Context Missing</h2>
            <p className="text-gray-400 mb-6">
              Please open this game within a Farcaster client like Warpcast
            </p>
            <a 
              href="https://warpcast.com/" 
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
              target="_blank"
            >
              Open in Warpcast
            </a>
          </div>
        )}
      </div>

      {/* Mini App Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/80 backdrop-blur-sm text-center">
        <p className="text-gray-400 text-sm">
          Playing in Farcaster Mini App
        </p>
      </div>
    </div>
  );
}
