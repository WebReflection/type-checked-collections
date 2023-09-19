# type-checked-collections

[![Coverage Status](https://coveralls.io/repos/github/WebReflection/type-checked-collections/badge.svg?branch=main)](https://coveralls.io/github/WebReflection/type-checked-collections?branch=main) [![build status](https://github.com/WebReflection/type-checked-collections/actions/workflows/node.js.yml/badge.svg)](https://github.com/WebReflection/type-checked-collections/actions)


Collections that actually type-check at runtime, not only in IDEs.

```js
import { typedSet, typedMap, typedWeakSet, typedWeakMap } from 'type-checked-collections';

// define `typeof` or `instanceof` where
//  * typeof is a `string` with possible unions in it
//  * instanceof is a Class or an array of classes (unions)

// Set define the kind of value they can use
const StringSet = typedSet({typeof: 'string'});

const myStrings = new StringSet(['a', 'b']);
myString.add('c');

// this throws a TypeError
myString.add(1);

// Map and WeakMap define a key/value pair where
// null(ish) key or value means: `any`
const StringKeyMap = typedMap([
  // key
  {typeof: 'string | number'},
  // value as any
  null
]);
```

It is possible to define either keys or values as a combination of `typeof` and `instanceof`:

```js
import { typedSet } from 'type-checked-collections';

const TypedSet = typedSet({
  // accept typeof string and typeof number
  typeof: 'string | number',
  // accept only instance of String
  instanceof: String,
  // ... or ...
  // accept instance of String or instance of Number
  instanceof: [String, Number],
});

const ts = new TypedSet([
  new String('a'),
  'b',
  1,
  new Number(2)
]);

// throws a TypeError
ts.add({});
ts.add(null);
ts.add(void 0);
ts.add(true);
```

| typeof    | runtime check                                 |
| :-------- | :-------------------------------------------- |
| string    | `typeof value === 'string'`                   |
| boolean   | `typeof value === 'boolean'`                  |
| number    | `typeof value === 'number'`                   |
| function  | `typeof value === 'function'`                 |
| symbol    | `typeof value === 'symbol'`                   |
| undefined | `typeof value === 'undefined'`                |
| bigint    | `typeof value === 'bigint'`                   |
| object    | `typeof value === 'object' && value !== null` |
| null      | `value === null`                              |


The `instanceof` single or multiple class value is checked via `instanceof` operator.

### Performance

If `typeof` value is specified, it is the first performed check and it is the fastest check in ECMAScript.

If that passes, and the `instanceof` value is defined, an `instanceof` operator is used to validate further. The same happens if no `typeof` field is defined, but only `instanceof`.

In `Map` and `WeakMap` cases, if either the *key* or the value is *null* or *undefined*, the check is a no-op such as `() => true`.

Last, but not least, if there is only **one type** to check, either one `typeof` without unions or one `instanceof` class only, the check is done directly without looping through the array of possible valid types.
