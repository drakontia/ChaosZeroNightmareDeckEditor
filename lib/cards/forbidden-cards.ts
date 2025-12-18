import { Card, CardType, CardCategory } from "@/types";

export const FORBIDDEN_CARDS: Card[] = [
  {
    id: "forbidden_card_1",
    name: "禁呪",
    type: CardType.FORBIDDEN,
    category: CardCategory.ATTACK,
    statuses: [],
    allowedJobs: "all",
    hiramekiVariations: [
      { level: 0, cost: 7, description: "禁断の魔法で敵に大ダメージ（反動あり）" },
      { level: 1, cost: 6, description: "禁断の魔法で敵に大ダメージ（反動軽減）" },
      { level: 2, cost: 6, description: "禁断の魔法で敵に超大ダメージ（反動軽減）" },
      { level: 3, cost: 5, description: "禁断の魔法で敵に超大ダメージ（反動なし）" }
    ]
  }
];
