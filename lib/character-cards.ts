import { Card, CardType, CardCategory, CardStatus } from "@/types";

export const CHARACTER_CARDS: Card[] = [
  // Character starting cards (3 basic + 1 with hirameki)
  {
    id: "char_card_1",
    name: "真月",
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [CardStatus.OPENING],
    isBasicCard: true,
    isStartingCard: true,
    imgUrl: "https://cdn.wikiwiki.jp/to/w/meiling/%E3%83%81%E3%82%BA%E3%83%AB/::ref/screenshot.114.png.webp",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ61% x 2" }
    ]
  },
  {
    id: "char_card_2",
    name: "基本防御",
    type: CardType.CHARACTER,
    category: CardCategory.ENHANCEMENT,
    statuses: [],
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "自身の防御力を上げる" }
    ]
  },
  {
    id: "char_card_3",
    name: "基本回復",
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "自身のHPを回復" }
    ]
  },
  {
    id: "char_card_4",
    name: "ファイアボール",
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    isBasicCard: false,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 3, description: "敵単体に火属性ダメージを与える" },
      { level: 1, cost: 3, description: "敵単体に火属性ダメージを与える（威力小上昇）", status: "火傷" },
      { level: 2, cost: 2, description: "敵単体に火属性ダメージを与える（威力上昇）", status: "火傷" },
      { level: 3, cost: 2, description: "敵単体に大火属性ダメージを与える", status: "火傷・防御低下" },
      { level: 4, cost: 1, description: "敵単体に大火属性ダメージを与える（威力上昇）", status: "火傷・防御低下" },
      { level: 5, cost: 1, description: "敵単体に超大火属性ダメージを与える", status: "火傷・防御低下・継続ダメージ" }
    ]
  },
  // Character hirameki cards
  {
    id: "char_hirameki_1",
    name: "フレイムストライク",
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    hiramekiVariations: [
      { level: 0, cost: 4, description: "敵単体に強力な火属性ダメージ" },
      { level: 1, cost: 4, description: "敵単体に強力な火属性ダメージ（威力小上昇）", status: "火傷" },
      { level: 2, cost: 3, description: "敵単体に強力な火属性ダメージ（威力上昇）", status: "火傷・防御低下" },
      { level: 3, cost: 3, description: "敵単体に超強力な火属性ダメージ", status: "火傷・防御低下" },
      { level: 4, cost: 2, description: "敵単体に超強力な火属性ダメージ（威力上昇）", status: "火傷・防御低下・スタン" },
      { level: 5, cost: 2, description: "敵単体に極大火属性ダメージ", status: "火傷・防御低下・スタン・継続ダメージ" }
    ]
  },
  {
    id: "char_hirameki_2",
    name: "アイスシールド",
    type: CardType.CHARACTER,
    category: CardCategory.ENHANCEMENT,
    statuses: [],
    hiramekiVariations: [
      { level: 0, cost: 2, description: "氷の盾で防御し、攻撃者にダメージ" },
      { level: 1, cost: 2, description: "氷の盾で防御し、攻撃者にダメージ（威力小上昇）" },
      { level: 2, cost: 2, description: "氷の盾で防御し、攻撃者に高ダメージ", status: "凍結" },
      { level: 3, cost: 1, description: "氷の盾で防御し、攻撃者に高ダメージ＋凍結", status: "凍結" },
      { level: 4, cost: 1, description: "氷の盾で完全防御し、攻撃者に大ダメージ＋凍結", status: "凍結・防御低下" },
      { level: 5, cost: 0, description: "氷の盾で完全防御し、攻撃者に超大ダメージ", status: "凍結・防御低下・スタン" }
    ]
  },
  {
    id: "char_hirameki_3",
    name: "ヒール",
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    hiramekiVariations: [
      { level: 0, cost: 2, description: "味方単体のHPを回復する" },
      { level: 1, cost: 2, description: "味方単体のHPを回復する（回復量小上昇）" },
      { level: 2, cost: 2, description: "味方単体のHPを回復する（回復量上昇）", status: "再生" },
      { level: 3, cost: 2, description: "味方全体のHPを回復する" },
      { level: 4, cost: 1, description: "味方全体のHPを大回復する", status: "再生" },
      { level: 5, cost: 1, description: "味方全体のHPを超回復する", status: "再生・防御上昇" }
    ]
  },
  {
    id: "char_hirameki_4",
    name: "防御",
    type: CardType.CHARACTER,
    category: CardCategory.ENHANCEMENT,
    statuses: [],
    hiramekiVariations: [
      { level: 0, cost: 1, description: "自身の防御力を上げる" },
      { level: 1, cost: 1, description: "自身の防御力を上げる（効果小上昇）" },
      { level: 2, cost: 1, description: "自身の防御力を大きく上げる", status: "防御上昇" },
      { level: 3, cost: 0, description: "自身の防御力を大きく上げる＋ダメージ無効1回", status: "防御上昇" },
      { level: 4, cost: 0, description: "自身の防御力を超上昇＋ダメージ無効2回", status: "防御上昇・再生" },
      { level: 5, cost: 0, description: "自身を無敵状態にする（1ターン）", status: "無敵・防御上昇・再生" }
    ]
  }
];
