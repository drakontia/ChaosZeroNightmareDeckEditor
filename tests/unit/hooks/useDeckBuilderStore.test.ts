import { describe, it, expect, beforeEach } from 'vitest';
import { act } from '@testing-library/react';
import { useDeckBuilderStore } from '@/hooks/useDeckBuilderStore';
import { CHARACTERS } from '@/lib/characters';
import { CardType, CardCategory, GodType, EquipmentType } from '@/types';

function getTestCard() {
  return {
    deckId: 'test_card_1',
    id: 'shared_01',
    name: 'テストカード',
    type: CardType.SHARED,
    category: CardCategory.ATTACK,
    statuses: [],
    selectedHiramekiLevel: 0,
    godHiramekiType: null,
    godHiramekiEffectId: null,
    hiramekiVariations: [{ level: 0, cost: 1, description: 'test' }],
  };
}

describe('useDeckBuilderStore', () => {
  beforeEach(() => {
    // ストアを初期化
    act(() => {
      useDeckBuilderStore.getState().reset();
    });
  });

  it('setDeckでデッキ全体が更新される', () => {
    const deck = {
      name: 'testdeck',
      character: CHARACTERS[0],
      equipment: { weapon: null, armor: null, pendant: null },
      cards: [],
      egoLevel: 1,
      hasPotential: true,
      createdAt: new Date(),
      removedCards: new Map(),
      copiedCards: new Map(),
      convertedCards: new Map(),
    };
    act(() => {
      useDeckBuilderStore.getState().setDeck(deck);
    });
    expect(useDeckBuilderStore.getState().deck?.name).toBe('testdeck');
    expect(useDeckBuilderStore.getState().deck?.character?.id).toBe(CHARACTERS[0].id);
    expect(useDeckBuilderStore.getState().deck?.egoLevel).toBe(1);
    expect(useDeckBuilderStore.getState().deck?.hasPotential).toBe(true);
  });

  it('setCharacterでキャラクターと開始カードが更新される', () => {
    act(() => {
      useDeckBuilderStore.getState().setCharacter(CHARACTERS[1]);
    });
    const deck = useDeckBuilderStore.getState().deck;
    expect(deck?.character?.id).toBe(CHARACTERS[1].id);
    expect(deck?.cards.length).toBeGreaterThan(0);
  });

  it('addCard/removeCardでcardsが変化する', () => {
    const card = getTestCard();
    act(() => {
      useDeckBuilderStore.getState().addCard(card);
    });
    expect(useDeckBuilderStore.getState().deck?.cards.length).toBe(1);
    act(() => {
      useDeckBuilderStore.getState().removeCard(card.deckId);
    });
    expect(useDeckBuilderStore.getState().deck?.cards.length).toBe(0);
  });

  it('selectEquipmentで装備が更新される', () => {
    act(() => {
      useDeckBuilderStore.getState().setCharacter(CHARACTERS[0]);
      useDeckBuilderStore.getState().selectEquipment(EquipmentType.WEAPON, { id: 'weapon_1', name: '武器', type: 'weapon', rarity: 'R' });
    });
    expect(useDeckBuilderStore.getState().deck?.equipment.weapon?.id).toBe('weapon_1');
  });

  it('resetで初期状態に戻る', () => {
    act(() => {
      useDeckBuilderStore.getState().setCharacter(CHARACTERS[0]);
      useDeckBuilderStore.getState().addCard(getTestCard());
      useDeckBuilderStore.getState().reset();
    });
    const deck = useDeckBuilderStore.getState().deck;
    expect(deck?.character).toBeNull();
    expect(deck?.cards.length).toBe(0);
  });

  it('setEgoLevelでegoLevelsが更新される', () => {
    act(() => {
      useDeckBuilderStore.getState().setEgoLevel('char-1', 3);
    });
    expect(useDeckBuilderStore.getState().egoLevels['char-1']).toBe(3);
  });

  it('setPotentialでhasPotentialが切り替わる', () => {
    act(() => {
      useDeckBuilderStore.getState().setCharacter(CHARACTERS[0]);
      useDeckBuilderStore.getState().setPotential(true);
    });
    expect(useDeckBuilderStore.getState().deck?.hasPotential).toBe(true);
  });

  it('updateCardHiramekiでselectedHiramekiLevelが更新される', () => {
    const card = getTestCard();
    act(() => {
      useDeckBuilderStore.getState().setCharacter(CHARACTERS[0]);
      useDeckBuilderStore.getState().addCard(card);
      useDeckBuilderStore.getState().updateCardHirameki(card.deckId, 2);
    });
    const updated = useDeckBuilderStore.getState().deck?.cards.find(c => c.deckId === card.deckId);
    expect(updated?.selectedHiramekiLevel).toBe(2);
  });

  it('setCardGodHiramekiでgodHiramekiTypeが更新される', () => {
    const card = getTestCard();
    act(() => {
      useDeckBuilderStore.getState().setCharacter(CHARACTERS[0]);
      useDeckBuilderStore.getState().addCard(card);
      useDeckBuilderStore.getState().setCardGodHirameki(card.deckId, GodType.KILKEN);
    });
    const updated = useDeckBuilderStore.getState().deck?.cards.find(c => c.deckId === card.deckId);
    expect(updated?.godHiramekiType).toBe('kilken');
  });

  it('setCardGodHiramekiEffectでgodHiramekiEffectIdが更新される', () => {
    const card = getTestCard();
    act(() => {
      useDeckBuilderStore.getState().setCharacter(CHARACTERS[0]);
      useDeckBuilderStore.getState().addCard(card);
      useDeckBuilderStore.getState().setCardGodHiramekiEffect(card.deckId, 'effect-1');
    });
    const updated = useDeckBuilderStore.getState().deck?.cards.find(c => c.deckId === card.deckId);
    expect(updated?.godHiramekiEffectId).toBe('effect-1');
  });

  it('undoCardでカードが削除される', () => {
    const card = getTestCard();
    act(() => {
      useDeckBuilderStore.getState().setCharacter(CHARACTERS[0]);
      useDeckBuilderStore.getState().addCard(card);
      useDeckBuilderStore.getState().undoCard(card.deckId);
    });
    expect(useDeckBuilderStore.getState().deck?.cards.find(c => c.deckId === card.deckId)).toBeUndefined();
  });

  it('copyCardでカードがコピーされisCopied等が付与される', () => {
    const card = getTestCard();
    act(() => {
      useDeckBuilderStore.getState().setCharacter(CHARACTERS[0]);
      useDeckBuilderStore.getState().addCard(card);
      useDeckBuilderStore.getState().copyCard(card.deckId);
    });
    const cards = useDeckBuilderStore.getState().deck?.cards.filter(c => c.id === card.id);
    expect(cards?.length).toBe(2);
    const copied = cards?.find(c => c.isCopied);
    expect(copied?.copiedFromCardId).toBe(card.id);
  });

  it('convertCardでカードが変換されconvertedCardsに記録される', () => {
    const card = getTestCard();
    // 変換先カードをCHARACTERS[0]のstartingCards[0]で仮定
    const targetId = CHARACTERS[0].startingCards[0];
    act(() => {
      useDeckBuilderStore.getState().setCharacter(CHARACTERS[0]);
      useDeckBuilderStore.getState().addCard(card);
      useDeckBuilderStore.getState().convertCard(card.deckId, targetId);
    });
    const deck = useDeckBuilderStore.getState().deck!;
    // cardsにtargetIdのカードが存在
    expect(deck.cards.some(c => c.id === targetId)).toBe(true);
    // convertedCardsに記録
    expect(deck.convertedCards.has(card.id)).toBe(true);
  });

  it('restoreCardで変換カードが復元される', () => {
    const card = getTestCard();
    const targetId = CHARACTERS[0].startingCards[0];
    act(() => {
      useDeckBuilderStore.getState().setCharacter(CHARACTERS[0]);
      useDeckBuilderStore.getState().addCard(card);
      useDeckBuilderStore.getState().convertCard(card.deckId, targetId);
      // 変換先カードを除外し、元カードを復元
      useDeckBuilderStore.getState().restoreCard(card);
    });
    const deck = useDeckBuilderStore.getState().deck!;
    // 元カードが復元されている
    expect(deck.cards.some(c => c.id === card.id)).toBe(true);
    // 変換先カードが除外されている
    expect(deck.cards.some(c => c.id === targetId)).toBe(false);
    // convertedCardsからも削除
    expect(deck.convertedCards.has(card.id)).toBe(false);
  });
});
