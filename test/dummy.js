import { typedSet, typedMap, typedWeakSet, typedWeakMap } from '../esm/dummy.js';

console.assert(typedSet() === Set);
console.assert(typedMap() === Map);
console.assert(typedWeakSet() === WeakSet);
console.assert(typedWeakMap() === WeakMap);
