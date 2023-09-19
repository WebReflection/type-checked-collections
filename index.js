const any = () => true;

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

const failure = (type, Class, kind = 'value') => value => {
  const message = [`Invalid ${typeof value} ${kind}: expected `];
  if (type) {
    message.push(type);
    if (Class) message.push(' or ');
  }
  if (Class) {
    message.push('an instanceof ');
    message.push([].concat(Class).map(({name}) => name).join(' | '));
  }
  throw new TypeError(message.join(''));
};

const createSet = Set => ({ typeof: type, instanceof: Class }) => {
  const check = validator(type, Class);
  const fail = failure(type, Class);
  return class TypedSet extends Set {
    add(value) {
      return check(value) ? super.add(value) : fail(value);
    }
  };
};

const typedSet = createSet(Set);
const typedWeakSet = createSet(WeakSet);

const createMap = Map => ([key, value]) => {
  const kt = key?.typeof, ki = key?.instanceof;
  const checkKey = validator(kt, ki);
  const failKey = failure(kt, ki, 'key');
  const vt = value?.typeof, vi = value?.instanceof;
  const checkValue = validator(vt, vi);
  const failValue = failure(vt, vi);
  return class TypedMap extends Map {
    set(key, value) {
      if (!checkKey(key)) failKey(key);
      if (!checkValue(value)) failValue(value);
      return super.set(key, value);
    }
  };
};

const typedMap = createMap(Map);
const typedWeakMap = createMap(WeakMap);

export { typedMap, typedSet, typedWeakMap, typedWeakSet };
