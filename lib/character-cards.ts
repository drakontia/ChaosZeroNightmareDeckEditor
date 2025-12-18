import { Card, CardType, CardCategory, CardStatus } from "@/types";

/**
 * Character Cards
 * 
 * Note: Card names and descriptions are displayed using translations from messages/*.json files.
 * - Card name: t(`cards.${card.id}.name`)
 * - Card description: t(`cards.${card.id}.descriptions.${level}`)
 * 
 * The name and description fields below serve as fallback values when translations are not available.
 */
export const CHARACTER_CARDS: Card[] = [
  // Character starting cards (3 basic + 1 with hirameki)
  {
    id: "char_card_1",
    name: "真月", // Fallback: See messages/*.json for translations
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [CardStatus.OPENING],
    isBasicCard: true,
    isStartingCard: true,
    imgUrl: "https://cdn.wikiwiki.jp/to/w/meiling/%E3%83%81%E3%82%BA%E3%83%AB/::ref/screenshot.114.png.webp",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ61% x 2" } // Fallback
    ]
  },
  {
    id: "char_card_2",
    name: "基本防御", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ENHANCEMENT,
    statuses: [],
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "自身の防御力を上げる" } // Fallback
    ]
  },
  {
    id: "char_card_3",
    name: "基本回復", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "自身のHPを回復" } // Fallback
    ]
  },
  {
    id: "char_card_4",
    name: "ファイアボール", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    isBasicCard: false,
    isStartingCard: true,
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 3, description: "敵単体に火属性ダメージを与える" },
      { level: 1, cost: 3, description: "敵単体に火属性ダメージを与える（威力小上昇）", statuses: [CardStatus.CELESTIAL] },
      { level: 2, cost: 2, description: "敵単体に火属性ダメージを与える（威力上昇）", statuses: [CardStatus.CELESTIAL] },
      { level: 3, cost: 2, description: "敵単体に大火属性ダメージを与える", statuses: [CardStatus.CELESTIAL, CardStatus.PRESERVATION] },
      { level: 4, cost: 1, description: "敵単体に大火属性ダメージを与える（威力上昇）", statuses: [CardStatus.CELESTIAL, CardStatus.PRESERVATION] },
      { level: 5, cost: 1, description: "敵単体に超大火属性ダメージを与える", statuses: [CardStatus.CELESTIAL, CardStatus.PRESERVATION, CardStatus.RECOVERY] }
    ]
  },
  // Character hirameki cards
  {
    id: "char_hirameki_1",
    name: "フレイムストライク", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 4, description: "敵単体に強力な火属性ダメージ" },
      { level: 1, cost: 4, description: "敵単体に強力な火属性ダメージ（威力小上昇）", statuses: [CardStatus.CELESTIAL] },
      { level: 2, cost: 3, description: "敵単体に強力な火属性ダメージ（威力上昇）", statuses: [CardStatus.CELESTIAL, CardStatus.PRESERVATION] },
      { level: 3, cost: 3, description: "敵単体に超強力な火属性ダメージ", statuses: [CardStatus.CELESTIAL, CardStatus.PRESERVATION] },
      { level: 4, cost: 2, description: "敵単体に超強力な火属性ダメージ（威力上昇）", statuses: [CardStatus.CELESTIAL, CardStatus.PRESERVATION, CardStatus.ULTIMATE] },
      { level: 5, cost: 2, description: "敵単体に極大火属性ダメージ", statuses: [CardStatus.CELESTIAL, CardStatus.PRESERVATION, CardStatus.ULTIMATE, CardStatus.RECOVERY] }
    ]
  },
  {
    id: "char_hirameki_2",
    name: "アイスシールド", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ENHANCEMENT,
    statuses: [],
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 2, description: "氷の盾で防御し、攻撃者にダメージ" },
      { level: 1, cost: 2, description: "氷の盾で防御し、攻撃者にダメージ（威力小上昇）" },
      { level: 2, cost: 2, description: "氷の盾で防御し、攻撃者に高ダメージ", statuses: [CardStatus.CELESTIAL] },
      { level: 3, cost: 1, description: "氷の盾で防御し、攻撃者に高ダメージ＋凍結", statuses: [CardStatus.CELESTIAL] },
      { level: 4, cost: 1, description: "氷の盾で完全防御し、攻撃者に大ダメージ＋凍結", statuses: [CardStatus.CELESTIAL, CardStatus.PRESERVATION] },
      { level: 5, cost: 0, description: "氷の盾で完全防御し、攻撃者に超大ダメージ", statuses: [CardStatus.CELESTIAL, CardStatus.PRESERVATION, CardStatus.ULTIMATE] }
    ]
  },
  {
    id: "char_hirameki_3",
    name: "ヒール", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 2, description: "味方単体のHPを回復する" },
      { level: 1, cost: 2, description: "味方単体のHPを回復する（回復量小上昇）" },
      { level: 2, cost: 2, description: "味方単体のHPを回復する（回復量上昇）", statuses: [CardStatus.RECOVERY] },
      { level: 3, cost: 2, description: "味方全体のHPを回復する" },
      { level: 4, cost: 1, description: "味方全体のHPを大回復する", statuses: [CardStatus.RECOVERY] },
      { level: 5, cost: 1, description: "味方全体のHPを超回復する", statuses: [CardStatus.RECOVERY, CardStatus.PRESERVATION] }
    ]
  },
  {
    id: "char_hirameki_4",
    name: "防御", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ENHANCEMENT,
    statuses: [],
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "自身の防御力を上げる" },
      { level: 1, cost: 1, description: "自身の防御力を上げる（効果小上昇）" },
      { level: 2, cost: 1, description: "自身の防御力を大きく上げる", statuses: [CardStatus.PRESERVATION] },
      { level: 3, cost: 0, description: "自身の防御力を大きく上げる＋ダメージ無効1回", statuses: [CardStatus.PRESERVATION] },
      { level: 4, cost: 0, description: "自身の防御力を超上昇＋ダメージ無効2回", statuses: [CardStatus.PRESERVATION, CardStatus.RECOVERY] },
      { level: 5, cost: 0, description: "自身を無敵状態にする（1ターン）", statuses: [CardStatus.ULTIMATE, CardStatus.PRESERVATION, CardStatus.RECOVERY] }
    ]
  }
];
