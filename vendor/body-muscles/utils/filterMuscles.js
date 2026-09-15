"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterMuscles = filterMuscles;
const data_1 = require("../data");
const types_1 = require("../types");
/**
 * Get muscle definitions filtered by anatomical view
 */
function filterMuscles(view) {
    return view === types_1.ViewSide.FRONT ? data_1.FRONT_MUSCLES : data_1.BACK_MUSCLES;
}
//# sourceMappingURL=filterMuscles.js.map