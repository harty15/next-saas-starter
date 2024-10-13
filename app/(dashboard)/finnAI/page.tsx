'use client';

import { Button } from '@/components/ui/button';
import { DashboardComponent } from '@/components/dashboard';
import { useEffect, useState } from 'react';

// Mock function to get user tier - replace this with actual API call or auth logic
const getUserTier = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return 'base'; // or 'plus' or 'free'
};

export default function FinnAILandingPage() {
  const [userTier, setUserTier] = useState<string | null>(null);

  useEffect(() => {
    getUserTier().then(tier => setUserTier(tier));
  }, []);

  if (userTier === null) {
    return <div>Loading...</div>;
  }

  if (userTier === 'base' || userTier === 'plus') {
    return <DashboardComponent />;
  }

  // Render landing page for free tier or unknown tier
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">Welcome to FinnAI</h1>
      <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl">
        Your AI-powered financial assistant. Manage your money smarter, faster, and easier.
      </p>
      <Button className="bg-white text-blue-600 hover:bg-blue-100 text-lg px-8 py-3 rounded-full">
        Get Started
      </Button>
    </div>
  );
}
