const any = () => true;
const error = message => {
  throw new TypeError(message);
};

const validator = (type, Class) => {
  const checks = [];
  if (type) {
    for (const t of type.split(/\s*\|\s*/)) {
      if (t === 'object')
        checks.push(v => v !== null && typeof v === t);
      else if (t === 'null')
        checks.push(v => v === null);
      else
        checks.push(v => typeof v === t);
    }
  }
  if (Class) {
    for (const C of [].concat(Class))
      checks.push(o => o instanceof C);
  }
  if (checks.length === 1)
    return checks[0];
  if (checks.length)
    return v => checks.some(f => f(v));
  return any;
};

const failure = (type, Class, kind, onerror = error) => value => {
  const message = [`Invalid ${typeof value} ${kind}: expected `];
  if (type) {
    message.push(type);
    if (Class) message.push(' or ');
  }
  if (Class) {
    message.push('an instanceof ');
    message.push([].concat(Class).map(({name}) => name).join(' | '));
  }
  onerror(message.join(''), value);
};

const checkFail = (options, kind = 'value') => {
  const type = options?.typeof;
  const Class = options?.instanceof;
  return [
    validator(type, Class),
    failure(type, Class, kind, options?.onerror)
  ];
};

const createSet = Set => options => {
  const [check, fail] = checkFail(options);
  return class TypedSet extends Set {
    add(value) {
      return check(value) ? super.add(value) : fail(value);
    }
  };
};

export const typedSet = createSet(Set);
export const typedWeakSet = createSet(WeakSet);

const createMap = Map => ([keyOptions, valueOptions]) => {
  const [checkKey, failKey] = checkFail(keyOptions, 'key');
  const [checkValue, failValue] = checkFail(valueOptions);
  return class TypedMap extends Map {
    set(key, value) {
      if (!checkKey(key)) failKey(key);
      if (!checkValue(value)) failValue(value);
      return super.set(key, value);
    }
  };
};

export const typedMap = createMap(Map);
export const typedWeakMap = createMap(WeakMap);
