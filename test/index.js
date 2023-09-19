import './dummy.js';
import { typedSet, typedMap } from '../esm/index.js';

let TypedString = typedSet({typeof: 'string'});

let ts = new TypedString(['a']);
try {
  ts.add(1);
  process.exit(1);
} catch ({ message }) {
  console.info('\x1b[1mExpected\x1b[0m:', message);
}

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
