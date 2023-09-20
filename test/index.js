import './dummy.js';
import { typedSet, typedMap } from '../esm/index.js';

let lastError = [];

/** @type {Set<string>} */
let TypedString = typedSet({typeof: 'string', onerror(...args) {
  lastError.push(...args);
}});

let ts = new TypedString(['a']);
ts.add(1);
if (
  lastError.length === 2 &&
  lastError[1] === 1 &&
  lastError[0] === 'Invalid number value: expected string'
) {
  console.info('\x1b[1mExpected\x1b[0m:', lastError[0]);
}
else proocess.exit(1);

TypedString = typedSet({instanceof: String});
ts = new TypedString([new String('a')]);

try {
  ts.add('b');
  process.exit(1);
} catch ({ message }) {
  console.info('\x1b[1mExpected\x1b[0m:', message);
}

TypedString = typedSet({typeof: 'string', instanceof: String});
ts = new TypedString([new String('a'), 'b']);
try {
  ts.add(1);
  process.exit(1);
} catch ({ message }) {
  console.info('\x1b[1mExpected\x1b[0m:', message);
}

let TypedMap = typedMap([
  {typeof: 'string | number'},
  {typeof: 'string'}
]);

let tm = new TypedMap([['key', 'value'], [1, 'value']]);

try {
  tm.set(true, 'nope');
  process.exit(1);
} catch ({ message }) {
  console.info('\x1b[1mExpected\x1b[0m:', message);
}

TypedMap = typedMap([
  null,
  {typeof: 'object | null'}
]);

tm = new TypedMap([['object', {}], ['null', null]]);

try {
  tm.set(void 0, 'undefined');
  process.exit(1);
} catch ({ message }) {
  console.info('\x1b[1mExpected\x1b[0m:', message);
}
