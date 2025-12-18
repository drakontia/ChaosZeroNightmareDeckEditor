import { Equipment } from "@/types";

// Import equipment from separate files
export { WEAPONS } from "./equipment/weapons";
export { ARMORS } from "./equipment/armors";
export { PENDANTS } from "./equipment/pendants";

import { WEAPONS } from "./equipment/weapons";
import { ARMORS } from "./equipment/armors";
import { PENDANTS } from "./equipment/pendants";

// All equipment combined
export const EQUIPMENT: Equipment[] = [...WEAPONS, ...ARMORS, ...PENDANTS];
