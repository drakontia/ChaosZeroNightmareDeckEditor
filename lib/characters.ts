import { Character, JobType } from "@/types";

export const CHARACTERS: Character[] = [
  {
    id: "char_1",
    name: "character.chizuru",
    rarity: "★5",
    job: JobType.PSIONIC,
    imgUrl: "/images/characters/chizuru.webp",
    startingCards: ["char_card_1", "char_card_2", "char_card_3", "char_card_4"],
    hiramekiCards: ["char_hirameki_1", "char_hirameki_2", "char_hirameki_3", "char_hirameki_4"]
  },
  {
    id: "char_2",
    name: "character.alice",
    rarity: "SSR",
    job: JobType.VANGUARD,
    imgUrl: "/images/characters/alice.png",
    startingCards: ["char_card_1", "char_card_2", "char_card_3", "char_card_4"],
    hiramekiCards: ["char_hirameki_1", "char_hirameki_2", "char_hirameki_3", "char_hirameki_4"]
  },
  {
    id: "char_3",
    name: "character.victor",
    rarity: "SR",
    job: JobType.RANGER,
    imgUrl: "/images/characters/victor.png",
    startingCards: ["char_card_1", "char_card_2", "char_card_3", "char_card_4"],
    hiramekiCards: ["char_hirameki_1", "char_hirameki_2", "char_hirameki_3", "char_hirameki_4"]
  },
  {
    id: "char_4",
    name: "character.emma",
    rarity: "SR",
    job: JobType.HUNTER,
    imgUrl: "/images/characters/emma.png",
    startingCards: ["char_card_1", "char_card_2", "char_card_3", "char_card_4"],
    hiramekiCards: ["char_hirameki_1", "char_hirameki_2", "char_hirameki_3", "char_hirameki_4"]
  },
  {
    id: "char_5",
    name: "character.kyle",
    rarity: "R",
    job: JobType.CONTROLLER,
    imgUrl: "/images/characters/kyle.png",
    startingCards: ["char_card_1", "char_card_2", "char_card_3", "char_card_4"],
    hiramekiCards: ["char_hirameki_1", "char_hirameki_2", "char_hirameki_3", "char_hirameki_4"]
  }
];
