"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMuscleColor = getMuscleColor;
const data_1 = require("../data");
/**
 * Get the fill color for a muscle based on its state and hover
 */
function getMuscleColor(state, isHovered) {
    if (state.intensity > 0) {
        const roundedIntensity = Math.min(Math.round(state.intensity), 10);
        return data_1.INTENSITY_COLORS[roundedIntensity] || data_1.INTENSITY_COLORS[10];
    }
    return data_1.INTENSITY_COLORS[0];
}
//# sourceMappingURL=getMuscleColor.js.map