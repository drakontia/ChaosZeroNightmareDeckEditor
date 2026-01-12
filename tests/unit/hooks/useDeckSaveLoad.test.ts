import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDeckSaveLoad } from '@/hooks/useDeckSaveLoad';
import { CHARACTERS } from '@/lib/characters';
import { Deck } from '@/types';

describe('useDeckSaveLoad', () => {
  let deck: Deck;
  let setName: (name: string) => void;
  let setSharedDeck: (deck: Deck | null) => void;
  let setShareError: (err: string | null) => void;
  let t: (key: string, opts?: { defaultValue?: string }) => string;
  let sharedDeck: Deck | null = null;
  let name: string = '';
  let error: string | null = null;

  beforeEach(() => {
    // localStorageをモック
    const store: Record<string, string> = {};
    const mockLocalStorage = {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => { store[key] = value; },
      removeItem: (key: string) => { delete store[key]; },
      clear: () => { Object.keys(store).forEach(k => delete store[k]); },
      length: 0,
      key: (index: number) => null
    };
    Object.defineProperty(global, 'localStorage', {
      value: mockLocalStorage,
      writable: true
    });
    // window.promptとwindow.alertをモック
    Object.defineProperty(global, 'window', {
      value: {
        localStorage: mockLocalStorage,
        prompt: vi.fn((message: string, defaultValue: string) => defaultValue),
        alert: vi.fn(),
        confirm: vi.fn(() => true)
      },
      writable: true
    });
    sharedDeck = null;
    name = '';
    error = null;
    setName = (n) => { name = n; };
    setSharedDeck = (d) => { sharedDeck = d; };
    setShareError = (e) => { error = e; };
    t = (k, o) => o?.defaultValue || k;
    deck = {
      name: 'testdeck',
      character: CHARACTERS.find(c => c.id === 'chizuru')!,
      equipment: { weapon: null, armor: null, pendant: null },
      cards: [],
      egoLevel: 0,
      hasPotential: false,
      createdAt: new Date(),
      removedCards: new Map(),
      copiedCards: new Map(),
      convertedCards: new Map()
    };
  });

  it('保存→読込でcharacterが維持される', () => {
    const { result } = renderHook(() => useDeckSaveLoad({ deck, setName, setSharedDeck, setShareError, t }));
    // 保存
    act(() => {
      result.current.handleSaveDeck();
    });
    // 読込
    act(() => {
      result.current.handleLoadDeck('testdeck');
    });
    expect(sharedDeck).not.toBeNull();
    expect(sharedDeck?.character?.id).toBe('chizuru');
  });
});
