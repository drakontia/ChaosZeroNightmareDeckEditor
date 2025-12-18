import { GodType, GodHiramekiDefinition } from "@/types";

// God Hirameki effect definitions (shared across all cards with multiple effects per god)
export const GOD_HIRAMEKI_EFFECTS: Record<GodType, GodHiramekiDefinition> = {
  [GodType.KILKEN]: {
    god: GodType.KILKEN,
    name: "kilken",
    effects: [
      {
        id: "kilken_1",
        name: "追加ダメージ",
        additionalEffect: "攻撃時、追加ダメージを与える",
        costModifier: -1
      },
      {
        id: "kilken_2",
        name: "クリティカル",
        additionalEffect: "クリティカル率が上昇する",
        costModifier: 0
      },
      {
        id: "kilken_3",
        name: "連続攻撃",
        additionalEffect: "攻撃が2回連続で発動する",
        costModifier: 1
      }
    ]
  },
  [GodType.SECLAID]: {
    god: GodType.SECLAID,
    name: "seclaid",
    effects: [
      {
        id: "seclaid_1",
        name: "防御強化",
        additionalEffect: "防御力を大幅に上昇させる"
      },
      {
        id: "seclaid_2",
        name: "ダメージ軽減",
        additionalEffect: "受けるダメージを50%軽減する"
      },
      {
        id: "seclaid_3",
        name: "バリア",
        additionalEffect: "次の攻撃を完全に無効化する",
        costModifier: 1
      }
    ]
  },
  [GodType.DIALOS]: {
    god: GodType.DIALOS,
    name: "dialos",
    effects: [
      {
        id: "dialos_1",
        name: "全体効果",
        additionalEffect: "全体効果に変化する"
      },
      {
        id: "dialos_2",
        name: "範囲拡大",
        additionalEffect: "効果範囲が2倍になる",
        costModifier: 1
      },
      {
        id: "dialos_3",
        name: "味方強化",
        additionalEffect: "味方全体に効果を付与する",
        costModifier: -1
      }
    ]
  },
  [GodType.NIHILUM]: {
    god: GodType.NIHILUM,
    name: "nihilum",
    effects: [
      {
        id: "nihilum_1",
        name: "効果無効化",
        additionalEffect: "敵の強化効果を無効化する"
      },
      {
        id: "nihilum_2",
        name: "デバフ解除",
        additionalEffect: "味方のデバフを全て解除する",
        costModifier: 0
      },
      {
        id: "nihilum_3",
        name: "沈黙",
        additionalEffect: "敵をスキル使用不可にする",
        costModifier: 1
      }
    ]
  },
  [GodType.VITOL]: {
    god: GodType.VITOL,
    name: "vitol",
    effects: [
      {
        id: "vitol_1",
        name: "HP回復",
        additionalEffect: "HPを回復する"
      },
      {
        id: "vitol_2",
        name: "継続回復",
        additionalEffect: "3ターンの間、継続的にHPを回復する",
        costModifier: 1
      },
      {
        id: "vitol_3",
        name: "蘇生",
        additionalEffect: "倒れた味方を復活させる",
        costModifier: 2
      }
    ]
  }
};
