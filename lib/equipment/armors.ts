import { Equipment, EquipmentType } from "@/types";

export const ARMORS: Equipment[] = [
  {
    id: "armor_1",
    name: "equipment.armor.holyArmor",
    type: EquipmentType.ARMOR,
    rarity: "SSR",
    description: "equipment.armor.holyArmor.description",
    imgUrl: "/images/equipment/armors/holy-armor.png"
  },
  {
    id: "armor_2",
    name: "equipment.armor.magicArmor",
    type: EquipmentType.ARMOR,
    rarity: "SR",
    description: "equipment.armor.magicArmor.description",
    imgUrl: "/images/equipment/armors/magic-armor.png"
  },
  {
    id: "armor_3",
    name: "equipment.armor.leatherArmor",
    type: EquipmentType.ARMOR,
    rarity: "R",
    description: "equipment.armor.leatherArmor.description",
    imgUrl: "/images/equipment/armors/leather-armor.png"
  }
];
