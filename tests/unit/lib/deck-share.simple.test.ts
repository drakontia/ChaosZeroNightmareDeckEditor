import { describe, it, expect } from 'vitest';
import { encodeDeckShare, decodeDeckShare } from '@/lib/deck-share';
import { Deck } from '@/types';

describe('deck-share encoding/decoding', () => {
  it('should encode empty deck', () => {
    const deck: Deck = {
      name: '',
      character: null,
      equipment: { weapon: null, armor: null, pendant: null },
      cards: [],
      egoLevel: 0,
      hasPotential: false,
      createdAt: new Date(),
      removedCards: new Map(),
      copiedCards: new Map(),
      convertedCards: new Map()
    };

    const encoded = encodeDeckShare(deck);
    expect(typeof encoded).toBe('string');
    expect(encoded.length).toBeGreaterThan(0);
  });

  it('should encode to URL-safe base64url format', () => {
    const deck: Deck = {
      name: 'Test Deck',
      character: null,
      equipment: { weapon: null, armor: null, pendant: null },
      cards: [],
      egoLevel: 3,
      hasPotential: true,
      createdAt: new Date(),
      removedCards: new Map(),
      copiedCards: new Map(),
      convertedCards: new Map()
    };

    const encoded = encodeDeckShare(deck);
    
    // Base64url should not have +, /, or =
    expect(encoded).not.toMatch(/[+/=]/);
    
    // Should be safe for URLs
    expect(() => {
      new URL(`https://example.com/deck/${encoded}`);
    }).not.toThrow();
  });

  it('should handle deck with name containing special characters', () => {
    const deck: Deck = {
      name: 'デッキ with !@#$% characters',
      character: null,
      equipment: { weapon: null, armor: null, pendant: null },
      cards: [],
      egoLevel: 0,
      hasPotential: false,
      createdAt: new Date(),
      removedCards: new Map(),
      copiedCards: new Map(),
      convertedCards: new Map()
    };

    const encoded = encodeDeckShare(deck);
    expect(typeof encoded).toBe('string');
    expect(encoded).not.toMatch(/[+/=]/);
  });

  it('should decode invalid string gracefully', () => {
    const invalid = 'invalid_base64_string!!!';
    const decoded = decodeDeckShare(invalid);
    expect(decoded).toBeNull();
  });

  it('should decode valid encoded deck', () => {
    const deck: Deck = {
      name: 'Test Deck',
      character: null,
      equipment: { weapon: null, armor: null, pendant: null },
      cards: [],
      egoLevel: 2,
      hasPotential: false,
      createdAt: new Date(),
      removedCards: new Map(),
      copiedCards: new Map(),
      convertedCards: new Map()
    };

    const encoded = encodeDeckShare(deck);
    const decoded = decodeDeckShare(encoded);

    expect(decoded).not.toBeNull();
    expect(decoded!.name).toBe(deck.name);
    expect(decoded!.egoLevel).toBe(deck.egoLevel);
  });
});
