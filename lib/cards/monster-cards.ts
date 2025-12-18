import { Card, CardType, CardCategory, JobType } from "@/types";

export const MONSTER_CARDS: Card[] = [
  {
    id: "monster_card_1",
    name: "モンスター召喚",
    type: CardType.MONSTER,
    category: CardCategory.SKILL,
    statuses: [],
    allowedJobs: [JobType.CONTROLLER, JobType.PSIONIC],
    hiramekiVariations: [
      { level: 0, cost: 4, description: "モンスターを召喚して攻撃" },
      { level: 1, cost: 3, description: "強力なモンスターを召喚して攻撃" },
      { level: 2, cost: 3, description: "強力なモンスターを召喚して複数回攻撃" },
      { level: 3, cost: 2, description: "伝説のモンスターを召喚して強力な攻撃", status: "防御低下" }
    ]
  }
];
