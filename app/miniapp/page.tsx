'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { neynar } from "@neynar/nodejs-sdk";
import GameComponent from '@/components/GameComponent';
import { motion } from 'framer-motion';

// Create a separate component for the main content
function MiniAppContent() {
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

  // ... rest of your component remains the same ...
  // [Keep all the JSX return code from your original implementation]
}

export default function MiniAppPage() {
  return (
    <Suspense fallback={
      <div className="w-full h-screen flex items-center justify-center bg-black">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-t-4 border-blue-500 rounded-full"
        />
      </div>
    }>
      <MiniAppContent />
    </Suspense>
  );
}
