import { Character, Equipment, EquipmentType, Card, CardType, HiramekiType } from "@/types";

// Sample characters from Chaos Zero Nightmare
export const CHARACTERS: Character[] = [
  {
    id: "char_1",
    name: "リリス",
    rarity: "SSR"
  },
  {
    id: "char_2",
    name: "アリス",
    rarity: "SSR"
  },
  {
    id: "char_3",
    name: "ヴィクター",
    rarity: "SR"
  },
  {
    id: "char_4",
    name: "エマ",
    rarity: "SR"
  },
  {
    id: "char_5",
    name: "カイル",
    rarity: "R"
  }
];

// Sample equipment
export const EQUIPMENT: Equipment[] = [
  // Weapons
  {
    id: "weapon_1",
    name: "聖剣エクスカリバー",
    type: EquipmentType.WEAPON,
    rarity: "SSR",
    description: "伝説の聖剣"
  },
  {
    id: "weapon_2",
    name: "ダークソード",
    type: EquipmentType.WEAPON,
    rarity: "SR",
    description: "闇の力を宿した剣"
  },
  {
    id: "weapon_3",
    name: "鋼の剣",
    type: EquipmentType.WEAPON,
    rarity: "R",
    description: "標準的な剣"
  },
  // Armor
  {
    id: "armor_1",
    name: "神聖なる鎧",
    type: EquipmentType.ARMOR,
    rarity: "SSR",
    description: "神々の加護を受けた鎧"
  },
  {
    id: "armor_2",
    name: "魔法の鎧",
    type: EquipmentType.ARMOR,
    rarity: "SR",
    description: "魔法防御力が高い"
  },
  {
    id: "armor_3",
    name: "革の鎧",
    type: EquipmentType.ARMOR,
    rarity: "R",
    description: "軽量な鎧"
  },
  // Pendants
  {
    id: "pendant_1",
    name: "生命のペンダント",
    type: EquipmentType.PENDANT,
    rarity: "SSR",
    description: "HPを大幅に増加"
  },
  {
    id: "pendant_2",
    name: "魔力のペンダント",
    type: EquipmentType.PENDANT,
    rarity: "SR",
    description: "魔力を増加"
  },
  {
    id: "pendant_3",
    name: "幸運のペンダント",
    type: EquipmentType.PENDANT,
    rarity: "R",
    description: "運を少し上げる"
  }
];

// Sample cards with Hirameki variations
export const CARDS: Card[] = [
  {
    id: "card_1",
    name: "ファイアボール",
    type: CardType.NORMAL,
    baseCost: 3,
    baseDescription: "敵単体に火属性ダメージを与える",
    hiramekiType: HiramekiType.NONE,
    normalHiramekiCost: 2,
    normalHiramekiDescription: "敵単体に火属性ダメージを与える（威力上昇）",
    godHiramekiCost: 1,
    godHiramekiDescription: "敵単体に大火属性ダメージを与える"
  },
  {
    id: "card_2",
    name: "ヒール",
    type: CardType.NORMAL,
    baseCost: 2,
    baseDescription: "味方単体のHPを回復する",
    hiramekiType: HiramekiType.NONE,
    normalHiramekiCost: 2,
    normalHiramekiDescription: "味方単体のHPを回復する（回復量上昇）",
    godHiramekiCost: 1,
    godHiramekiDescription: "味方全体のHPを回復する"
  },
  {
    id: "card_3",
    name: "防御",
    type: CardType.NORMAL,
    baseCost: 1,
    baseDescription: "自身の防御力を上げる",
    hiramekiType: HiramekiType.NONE,
    normalHiramekiCost: 1,
    normalHiramekiDescription: "自身の防御力を大きく上げる",
    godHiramekiCost: 0,
    godHiramekiDescription: "自身の防御力を大きく上げる（ダメージ無効1回）"
  },
  {
    id: "card_4",
    name: "全体攻撃",
    type: CardType.SHARED,
    baseCost: 5,
    baseDescription: "敵全体に無属性ダメージを与える",
    hiramekiType: HiramekiType.NONE,
    normalHiramekiCost: 4,
    normalHiramekiDescription: "敵全体に無属性ダメージを与える（威力上昇）",
    godHiramekiCost: 3,
    godHiramekiDescription: "敵全体に大無属性ダメージを与える"
  },
  {
    id: "card_5",
    name: "モンスター召喚",
    type: CardType.MONSTER,
    baseCost: 4,
    baseDescription: "モンスターを召喚して攻撃",
    hiramekiType: HiramekiType.NONE,
    normalHiramekiCost: 3,
    normalHiramekiDescription: "強力なモンスターを召喚して攻撃",
    godHiramekiCost: 2,
    godHiramekiDescription: "伝説のモンスターを召喚して強力な攻撃"
  },
  {
    id: "card_6",
    name: "禁呪",
    type: CardType.FORBIDDEN,
    baseCost: 7,
    baseDescription: "禁断の魔法で敵に大ダメージ（反動あり）",
    hiramekiType: HiramekiType.NONE,
    normalHiramekiCost: 6,
    normalHiramekiDescription: "禁断の魔法で敵に大ダメージ（反動軽減）",
    godHiramekiCost: 5,
    godHiramekiDescription: "禁断の魔法で敵に超大ダメージ（反動なし）"
  },
  {
    id: "card_7",
    name: "アイスシールド",
    type: CardType.NORMAL,
    baseCost: 2,
    baseDescription: "氷の盾で防御し、攻撃者にダメージ",
    hiramekiType: HiramekiType.NONE,
    normalHiramekiCost: 2,
    normalHiramekiDescription: "氷の盾で防御し、攻撃者に高ダメージ",
    godHiramekiCost: 1,
    godHiramekiDescription: "氷の盾で防御し、攻撃者に高ダメージ＋凍結"
  },
  {
    id: "card_8",
    name: "サンダーストーム",
    type: CardType.SHARED,
    baseCost: 6,
    baseDescription: "敵全体に雷属性ダメージ",
    hiramekiType: HiramekiType.NONE,
    normalHiramekiCost: 5,
    normalHiramekiDescription: "敵全体に雷属性ダメージ＋麻痺",
    godHiramekiCost: 4,
    godHiramekiDescription: "敵全体に大雷属性ダメージ＋麻痺＋スタン"
  }
];
