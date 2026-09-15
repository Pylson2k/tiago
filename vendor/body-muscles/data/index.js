"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INTENSITY_COLORS = exports.BACK_MUSCLES = exports.FRONT_MUSCLES = exports.MUSCLE_MAP = exports.MUSCLE_GROUPS = void 0;
const muscles_front_1 = require("./muscles.front");
Object.defineProperty(exports, "FRONT_MUSCLES", { enumerable: true, get: function () { return muscles_front_1.FRONT_MUSCLES; } });
const muscles_back_1 = require("./muscles.back");
Object.defineProperty(exports, "BACK_MUSCLES", { enumerable: true, get: function () { return muscles_back_1.BACK_MUSCLES; } });
var muscle_groups_1 = require("./muscle-groups");
Object.defineProperty(exports, "MUSCLE_GROUPS", { enumerable: true, get: function () { return muscle_groups_1.MUSCLE_GROUPS; } });
/**
 * Complete muscle map - all 70+ anatomical regions
 * Combines front and back view muscle definitions
 */
exports.MUSCLE_MAP = [...muscles_front_1.FRONT_MUSCLES, ...muscles_back_1.BACK_MUSCLES];
/**
 * Intensity color gradient mapping (0-10 scale)
 * Colors progress from yellow (low) → orange (mid) → red (high)
 */
exports.INTENSITY_COLORS = {
    0: "#94a3b8", // Slate 400 (inactive/neutral)
    1: "#fde047", // Yellow 300
    2: "#facc15", // Yellow 400
    3: "#eab308", // Yellow 500
    4: "#fb923c", // Orange 400
    5: "#f97316", // Orange 500
    6: "#ea580c", // Orange 600
    7: "#ef4444", // Red 500
    8: "#dc2626", // Red 600
    9: "#b91c1c", // Red 700
    10: "#7f1d1d", // Red 900
};
//# sourceMappingURL=index.js.map