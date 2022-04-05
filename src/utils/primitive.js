'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.convertToPrimitiveArray = exports.isPrimitive = void 0;
var isPrimitive = function (value) {
  return ['string', 'boolean', 'number'].indexOf(typeof value) > -1;
};
exports.isPrimitive = isPrimitive;
function convertToPrimitiveArray(value) {
  if (value === undefined) {
    return [];
  } else if (Array.isArray(value)) {
    return value;
  } else {
    return [value];
  }
}
exports.convertToPrimitiveArray = convertToPrimitiveArray;
//# sourceMappingURL=primitive.js.map
