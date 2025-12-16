"use client";

import { useDeckBuilder } from "@/hooks/useDeckBuilder";
import { CharacterSelector } from "./CharacterSelector";
import { EquipmentSelector } from "./EquipmentSelector";
import { CardSelector } from "./CardSelector";
import { DeckDisplay } from "./DeckDisplay";
import { CHARACTERS, EQUIPMENT, CARDS } from "@/lib/data";

export function DeckBuilder() {
  const {
    deck,
    selectCharacter,
    selectEquipment,
    addCard,
    removeCard,
    updateCardHirameki,
    clearDeck
  } = useDeckBuilder();

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            カオスゼロナイトメア デッキエディター
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            デッキを自由に編集できるツールです
          </p>
        </header>

        <div className="mb-6">
          <button
            onClick={clearDeck}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
          >
            デッキをクリア
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Selectors */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <CharacterSelector
                characters={CHARACTERS}
                selectedCharacter={deck.character}
                onSelect={selectCharacter}
              />
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <EquipmentSelector
                equipment={EQUIPMENT}
                selectedEquipment={deck.equipment}
                onSelect={selectEquipment}
              />
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <CardSelector
                cards={CARDS}
                onAddCard={addCard}
              />
            </div>
          </div>

          {/* Right column - Deck display */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg sticky top-4">
              <h2 className="text-2xl font-bold mb-4">現在のデッキ</h2>
              
              {/* Character Display */}
              {deck.character && (
                <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">
                    キャラクター
                  </h3>
                  <div className="text-lg font-bold">{deck.character.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {deck.character.rarity}
                  </div>
                </div>
              )}

              {/* Equipment Display */}
              <div className="mb-4 space-y-2">
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                  装備
                </h3>
                {deck.equipment.weapon && (
                  <div className="p-2 bg-green-50 dark:bg-green-900 rounded">
                    <span className="text-xs text-gray-600 dark:text-gray-400">武器: </span>
                    <span className="font-semibold">{deck.equipment.weapon.name}</span>
                  </div>
                )}
                {deck.equipment.armor && (
                  <div className="p-2 bg-green-50 dark:bg-green-900 rounded">
                    <span className="text-xs text-gray-600 dark:text-gray-400">防具: </span>
                    <span className="font-semibold">{deck.equipment.armor.name}</span>
                  </div>
                )}
                {deck.equipment.pendant && (
                  <div className="p-2 bg-green-50 dark:bg-green-900 rounded">
                    <span className="text-xs text-gray-600 dark:text-gray-400">ペンダント: </span>
                    <span className="font-semibold">{deck.equipment.pendant.name}</span>
                  </div>
                )}
                {!deck.equipment.weapon && !deck.equipment.armor && !deck.equipment.pendant && (
                  <div className="text-sm text-gray-500">装備なし</div>
                )}
              </div>

              {/* Cards Display */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
                  カード
                </h3>
                <DeckDisplay
                  cards={deck.cards}
                  onRemoveCard={removeCard}
                  onUpdateHirameki={updateCardHirameki}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
