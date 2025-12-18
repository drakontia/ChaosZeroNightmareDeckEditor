import { Card } from "@/types";

// Import cards from separate files
export { SHARED_CARDS } from "./cards/shared-cards";
export { MONSTER_CARDS } from "./cards/monster-cards";
export { FORBIDDEN_CARDS } from "./cards/forbidden-cards";

import { SHARED_CARDS } from "./cards/shared-cards";
import { MONSTER_CARDS } from "./cards/monster-cards";
import { FORBIDDEN_CARDS } from "./cards/forbidden-cards";

// All other cards combined
export const OTHER_CARDS: Card[] = [...SHARED_CARDS, ...MONSTER_CARDS, ...FORBIDDEN_CARDS];
