"use client";

import { Card, CardType } from "@/types";

interface CardSelectorProps {
  cards: Card[];
  onAddCard: (card: Card) => void;
}

export function CardSelector({ cards, onAddCard }: CardSelectorProps) {
  const getCardsByType = (type: CardType) => {
    return cards.filter(card => card.type === type);
  };

  const getCardTypeLabel = (type: CardType) => {
    switch (type) {
      case CardType.NORMAL:
        return "通常カード";
      case CardType.SHARED:
        return "共用カード";
      case CardType.MONSTER:
        return "モンスターカード";
      case CardType.FORBIDDEN:
        return "禁忌カード";
      default:
        return "カード";
    }
  };

  const getCardTypeColor = (type: CardType) => {
    switch (type) {
      case CardType.NORMAL:
        return "border-blue-300 hover:border-blue-400";
      case CardType.SHARED:
        return "border-purple-300 hover:border-purple-400";
      case CardType.MONSTER:
        return "border-red-300 hover:border-red-400";
      case CardType.FORBIDDEN:
        return "border-black hover:border-gray-700";
      default:
        return "border-gray-300 hover:border-gray-400";
    }
  };

  const renderCardSection = (type: CardType) => {
    const typeCards = getCardsByType(type);
    if (typeCards.length === 0) return null;

    return (
      <div key={type} className="mb-4">
        <h3 className="text-lg font-semibold mb-2">{getCardTypeLabel(type)}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {typeCards.map((card) => (
            <button
              key={card.id}
              onClick={() => onAddCard(card)}
              className={`p-3 rounded-lg border-2 text-left transition-all ${getCardTypeColor(card.type)}`}
            >
              <div className="flex justify-between items-start mb-1">
                <div className="font-semibold">{card.name}</div>
                <div className="text-sm font-bold bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                  コスト: {card.baseCost}
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {card.baseDescription}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">カード選択</h2>
      {[CardType.NORMAL, CardType.SHARED, CardType.MONSTER, CardType.FORBIDDEN].map(type => 
        renderCardSection(type)
      )}
    </div>
  );
}
