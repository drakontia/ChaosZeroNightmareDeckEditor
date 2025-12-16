"use client";

import { DeckCard, HiramekiType, getCardInfo } from "@/types";

interface DeckDisplayProps {
  cards: DeckCard[];
  onRemoveCard: (deckId: string) => void;
  onUpdateHirameki: (deckId: string, hiramekiType: HiramekiType) => void;
}

export function DeckDisplay({ cards, onRemoveCard, onUpdateHirameki }: DeckDisplayProps) {
  const getHiramekiLabel = (type: HiramekiType) => {
    switch (type) {
      case HiramekiType.NONE:
        return "削除";
      case HiramekiType.NORMAL:
        return "ヒラメキ";
      case HiramekiType.GOD:
        return "神ヒラメキ";
      default:
        return "削除";
    }
  };

  const getHiramekiButtonClass = (current: HiramekiType, target: HiramekiType) => {
    const baseClass = "px-3 py-1 text-sm rounded transition-all";
    if (current === target) {
      switch (target) {
        case HiramekiType.NONE:
          return `${baseClass} bg-gray-500 text-white`;
        case HiramekiType.NORMAL:
          return `${baseClass} bg-blue-500 text-white`;
        case HiramekiType.GOD:
          return `${baseClass} bg-yellow-500 text-white`;
      }
    }
    return `${baseClass} bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600`;
  };

  if (cards.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        カードを選択してデッキに追加してください
      </div>
    );
  }

  const totalCost = cards.reduce((sum, card) => {
    const info = getCardInfo(card);
    return sum + info.cost;
  }, 0);

  return (
    <div>
      <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-lg font-bold">デッキ枚数: {cards.length}</span>
          </div>
          <div>
            <span className="text-lg font-bold">合計コスト: {totalCost}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        {cards.map((card) => {
          const cardInfo = getCardInfo(card);
          return (
            <div
              key={card.deckId}
              className="p-4 border-2 border-gray-300 rounded-lg bg-white dark:bg-gray-900"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold">{card.name}</h3>
                    <span className="text-sm font-bold bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                      コスト: {cardInfo.cost}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {cardInfo.description}
                  </p>
                </div>
                <button
                  onClick={() => onRemoveCard(card.deckId)}
                  className="ml-4 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition-all"
                >
                  削除
                </button>
              </div>

              <div className="flex gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">状態:</span>
                <button
                  onClick={() => onUpdateHirameki(card.deckId, HiramekiType.NONE)}
                  className={getHiramekiButtonClass(card.hiramekiType, HiramekiType.NONE)}
                >
                  {getHiramekiLabel(HiramekiType.NONE)}
                </button>
                <button
                  onClick={() => onUpdateHirameki(card.deckId, HiramekiType.NORMAL)}
                  className={getHiramekiButtonClass(card.hiramekiType, HiramekiType.NORMAL)}
                >
                  {getHiramekiLabel(HiramekiType.NORMAL)}
                </button>
                <button
                  onClick={() => onUpdateHirameki(card.deckId, HiramekiType.GOD)}
                  className={getHiramekiButtonClass(card.hiramekiType, HiramekiType.GOD)}
                >
                  {getHiramekiLabel(HiramekiType.GOD)}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
