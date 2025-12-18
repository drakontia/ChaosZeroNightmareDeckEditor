import { Card, CardType, CardCategory, JobType } from "@/types";

export const SHARED_CARDS: Card[] = [
  {
    id: "shared_card_1",
    name: "全体攻撃",
    type: CardType.SHARED,
    category: CardCategory.ATTACK,
    statuses: [],
    allowedJobs: "all",
    hiramekiVariations: [
      { level: 0, cost: 5, description: "敵全体に無属性ダメージを与える" },
      { level: 1, cost: 4, description: "敵全体に無属性ダメージを与える（威力上昇）" },
      { level: 2, cost: 4, description: "敵全体に大無属性ダメージを与える", status: "防御低下" },
      { level: 3, cost: 3, description: "敵全体に超大無属性ダメージを与える", status: "防御低下・スタン" }
    ]
  },
  {
    id: "shared_card_2",
    name: "サンダーストーム",
    type: CardType.SHARED,
    category: CardCategory.ATTACK,
    statuses: [],
    allowedJobs: [JobType.STRIKER, JobType.RANGER],
    hiramekiVariations: [
      { level: 0, cost: 6, description: "敵全体に雷属性ダメージ" },
      { level: 1, cost: 5, description: "敵全体に雷属性ダメージ＋麻痺", status: "麻痺" },
      { level: 2, cost: 5, description: "敵全体に大雷属性ダメージ＋麻痺＋スタン", status: "麻痺・スタン" },
      { level: 3, cost: 4, description: "敵全体に超大雷属性ダメージ＋麻痺＋スタン", status: "麻痺・スタン・防御低下" }
    ]
  }
];
