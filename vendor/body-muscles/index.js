"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterMuscles = exports.getMuscleColor = exports.BACK_MUSCLES = exports.FRONT_MUSCLES = exports.INTENSITY_COLORS = exports.MUSCLE_GROUPS = exports.MUSCLE_MAP = exports.BodyChart = void 0;
// Main class export
var BodyChart_1 = require("./BodyChart");
Object.defineProperty(exports, "BodyChart", { enumerable: true, get: function () { return BodyChart_1.BodyChart; } });
// Type exports
__exportStar(require("./types"), exports);
// Data exports
var data_1 = require("./data");
Object.defineProperty(exports, "MUSCLE_MAP", { enumerable: true, get: function () { return data_1.MUSCLE_MAP; } });
Object.defineProperty(exports, "MUSCLE_GROUPS", { enumerable: true, get: function () { return data_1.MUSCLE_GROUPS; } });
Object.defineProperty(exports, "INTENSITY_COLORS", { enumerable: true, get: function () { return data_1.INTENSITY_COLORS; } });
Object.defineProperty(exports, "FRONT_MUSCLES", { enumerable: true, get: function () { return data_1.FRONT_MUSCLES; } });
Object.defineProperty(exports, "BACK_MUSCLES", { enumerable: true, get: function () { return data_1.BACK_MUSCLES; } });
// Utility exports
var utils_1 = require("./utils");
Object.defineProperty(exports, "getMuscleColor", { enumerable: true, get: function () { return utils_1.getMuscleColor; } });
Object.defineProperty(exports, "filterMuscles", { enumerable: true, get: function () { return utils_1.filterMuscles; } });
//# sourceMappingURL=index.js.map