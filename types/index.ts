// Character types
export interface Character {
  id: string;
  name: string;
  rarity: string; // N, R, SR, SSR
  imgUrl?: string;
  startingCards: string[]; // IDs of 4 starting cards
  hiramekiCards: string[]; // IDs of 4 hirameki cards
}

// Equipment types
export enum EquipmentType {
  WEAPON = "weapon",
  ARMOR = "armor",
  PENDANT = "pendant"
}

export interface Equipment {
  id: string;
  name: string;
  type: EquipmentType;
  rarity: string;
  description?: string;
  imgUrl?: string;
}

// Card types with enhanced Hirameki support
export enum CardType {
  NORMAL = "normal",
  SHARED = "shared",      // 共用カード
  MONSTER = "monster",    // モンスターカード
  FORBIDDEN = "forbidden" // 禁忌カード
}

// Hirameki variation for a card
export interface HiramekiVariation {
  level: number; // 0 = base, 1-5 for character cards, 1-3 for other cards
  cost: number;
  description: string;
  status?: string; // New element: status effects
}

// God Hirameki adds extra effects
export interface GodHirameki {
  additionalEffect: string;
  costModifier?: number; // Optional cost change
}

export interface Card {
  id: string;
  name: string;
  type: CardType;
  isBasicCard?: boolean; // True for the 3 basic cards that can't have hirameki
  imgUrl?: string;
  // Hirameki variations (index 0 is base, 1-5 for character cards, 1-3 for others)
  hiramekiVariations: HiramekiVariation[];
  // God hirameki information (separate from normal hirameki)
  godHirameki?: GodHirameki;
}

// Deck state
export interface DeckCard extends Card {
  deckId: string; // unique ID for this card in the deck
  selectedHiramekiLevel: number; // 0 = base, 1-5 for variations
  hasGodHirameki: boolean; // Whether god hirameki is applied
}

export interface Deck {
  character: Character | null;
  equipment: {
    weapon: Equipment | null;
    armor: Equipment | null;
    pendant: Equipment | null;
  };
  cards: DeckCard[];
}

// Helper function to get card info based on hirameki level and god hirameki
export function getCardInfo(card: DeckCard): {
  cost: number;
  description: string;
  status?: string;
} {
  const variation = card.hiramekiVariations[card.selectedHiramekiLevel] || card.hiramekiVariations[0];
  
  let cost = variation.cost;
  let description = variation.description;
  const status = variation.status;

  // Apply god hirameki if active
  if (card.hasGodHirameki && card.godHirameki) {
    description = `${description}\n${card.godHirameki.additionalEffect}`;
    if (card.godHirameki.costModifier !== undefined) {
      cost += card.godHirameki.costModifier;
    }
  }

  return { cost, description, status };
}
