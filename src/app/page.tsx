'use client';

import Hero from '@/components/Hero'
import TimeCounter from '@/components/TimeCounter';
import TulipCatcher from '@/components/TulipCatcher';
import { useState } from 'react';

export default function Home() {
  const [gameCompleted, setGameCompleted] = useState(false);

  return (
    <main className="min-h-screen">
      <Hero />
      <TimeCounter />
      <TulipCatcher onComplete={() => setGameCompleted(true)} gameCompleted={gameCompleted} />
    </main>
  );
}
