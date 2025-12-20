'use client';

import dynamic from 'next/dynamic';

const DeckBuilder = dynamic(() => import('@/components/DeckBuilder').then(mod => ({ default: mod.DeckBuilder })), {
  ssr: false,
});

export default function Home() {
  return <DeckBuilder />;
}
