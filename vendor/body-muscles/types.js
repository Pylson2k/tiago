"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewSide = void 0;
exports.isValidIntensity = isValidIntensity;
exports.createBodyPartState = createBodyPartState;
exports.extractMuscleSide = extractMuscleSide;
exports.extractMuscleGroup = extractMuscleGroup;
/**
 * Anatomical view direction for the body map
 * @enum
 */
var ViewSide;
(function (ViewSide) {
    /** Anterior (front) view of the body */
    ViewSide["FRONT"] = "FRONT";
    /** Posterior (back) view of the body */
    ViewSide["BACK"] = "BACK";
})(ViewSide || (exports.ViewSide = ViewSide = {}));
/**
 * Intensity level type guard
 * @param value - Number to check
 * @returns true if value is a valid intensity (0-10)
 */
function isValidIntensity(value) {
    return Number.isInteger(value) && value >= 0 && value <= 10;
}
/**
 * Create a new BodyPartState with default values
 * @param intensity - Initial intensity (default: 0)
 * @param selected - Initial selection state (default: false)
 * @returns New BodyPartState object
 */
function createBodyPartState(intensity = 0, selected = false) {
    if (!isValidIntensity(intensity)) {
        throw new Error(`Invalid intensity: ${intensity}. Must be 0-10.`);
    }
    return { intensity, selected };
}
/**
 * Extract side from muscle ID
 * @param muscleId - Muscle identifier
 * @returns 'left', 'right', or 'central'
 */
function extractMuscleSide(muscleId) {
    if (muscleId.endsWith("-left"))
        return "left";
    if (muscleId.endsWith("-right"))
        return "right";
    return "central";
}
/**
 * Extract muscle group from muscle ID
 * @param muscleId - Muscle identifier
 * @returns Base muscle group name
 */
function extractMuscleGroup(muscleId) {
    // Remove side suffix
    const base = muscleId.replace(/-(left|right)$/, "");
    // Take first part before any remaining dash
    return base.split("-")[0];
}
//# sourceMappingURL=types.js.map