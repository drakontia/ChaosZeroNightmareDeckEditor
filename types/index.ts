// Character types
export interface Character {
  id: string;
  name: string;
  rarity: string; // N, R, SR, SSR
  imgUrl?: string;
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

// Card types with Hirameki support
export enum HiramekiType {
  NONE = "none",
  NORMAL = "normal", // ヒラメキ
  GOD = "god"       // 神ヒラメキ
}

export enum CardType {
  NORMAL = "normal",
  SHARED = "shared",      // 共用カード
  MONSTER = "monster",    // モンスターカード
  FORBIDDEN = "forbidden" // 禁忌カード
}

export interface Card {
  id: string;
  name: string;
  type: CardType;
  baseCost: number;
  baseDescription: string;
  hiramekiType: HiramekiType;
  imgUrl?: string;
  // Cost and description variations based on hirameki
  normalHiramekiCost?: number;
  normalHiramekiDescription?: string;
  godHiramekiCost?: number;
  godHiramekiDescription?: string;
}

// Deck state
export interface DeckCard extends Card {
  deckId: string; // unique ID for this card in the deck
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

// Helper function to get card info based on hirameki
export function getCardInfo(card: Card): {
  cost: number;
  description: string;
} {
  switch (card.hiramekiType) {
    case HiramekiType.NORMAL:
      return {
        cost: card.normalHiramekiCost ?? card.baseCost,
        description: card.normalHiramekiDescription ?? card.baseDescription
      };
    case HiramekiType.GOD:
      return {
        cost: card.godHiramekiCost ?? card.baseCost,
        description: card.godHiramekiDescription ?? card.baseDescription
      };
    default:
      return {
        cost: card.baseCost,
        description: card.baseDescription
      };
  }
}
