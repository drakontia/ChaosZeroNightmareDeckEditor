"use client";

import dynamic from 'next/dynamic';
import { DeckBuilderProps } from './DeckBuilder';

const DeckBuilder = dynamic<DeckBuilderProps>(
  () => import('./DeckBuilder').then((mod) => ({ default: mod.DeckBuilder })),
  { ssr: false }
);

export default function ClientDeckBuilderPage(props: DeckBuilderProps) {
  return <DeckBuilder {...props} />;
}
