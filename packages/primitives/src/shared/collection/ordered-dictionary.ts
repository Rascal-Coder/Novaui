// Not a real member because it shouldn't be accessible, but the super class
// calls `set` which needs to read the instanciation state, so it can't be a
// private member.

const __instanciated = new WeakMap<OrderedDict<any, any>, boolean>();

/** 有序字典类 - 继承自 Map，但保持键的插入顺序 提供了基于索引的访问和操作方法 */
export class OrderedDict<K, V> extends Map<K, V> {
  /** 私有属性：保存键的有序数组 */
  #keys: K[];

  constructor(iterable?: Iterable<readonly [K, V]> | null | undefined);
  constructor(entries?: readonly (readonly [K, V])[] | null) {
    super(entries);
    this.#keys = [...super.keys()];
    __instanciated.set(this, true);
  }

  /** 设置键值对，如果键已存在则更新，否则添加到末尾 */
  override set(key: K, value: V) {
    if (__instanciated.get(this)) {
      if (this.has(key)) {
        this.#keys[this.#keys.indexOf(key)] = key;
      } else {
        this.#keys.push(key);
      }
    }
    super.set(key, value);
    return this;
  }

  /** 在指定索引位置插入键值对 */
  insert(index: number, key: K, value: V) {
    const has = this.has(key);
    const length = this.#keys.length;
    const relativeIndex = toSafeInteger(index);
    let actualIndex = relativeIndex >= 0 ? relativeIndex : length + relativeIndex;
    const safeIndex = actualIndex < 0 || actualIndex >= length ? -1 : actualIndex;

    if (safeIndex === this.size || (has && safeIndex === this.size - 1) || safeIndex === -1) {
      this.set(key, value);
      return this;
    }

    const size = this.size + (has ? 0 : 1);

    // 如果你在比如 -2 位置插入，没有这个处理的话，你会替换倒数第二个项目
    // 并将其余项目向上推一个位置，这意味着新项目是倒数第三个。
    // 这不太直观；在 -2 位置插入更像是说"让这个项目成为倒数第二个"。
    if (relativeIndex < 0) {
      actualIndex++;
    }

    const keys = [...this.#keys];
    let nextValue: V | undefined;
    let shouldSkip = false;
    for (let i = actualIndex; i < size; i++) {
      if (actualIndex === i) {
        let nextKey = keys[i]!;
        if (keys[i] === key) {
          nextKey = keys[i + 1]!;
        }
        if (has) {
          // 先删除以确保项目被移动到末尾
          this.delete(key);
        }
        nextValue = this.get(nextKey);
        this.set(key, value);
      } else {
        if (!shouldSkip && keys[i - 1] === key) {
          shouldSkip = true;
        }
        const currentKey = keys[shouldSkip ? i : i - 1]!;
        const currentValue = nextValue!;
        nextValue = this.get(currentKey);
        this.delete(currentKey);
        this.set(currentKey, currentValue);
      }
    }
    return this;
  }

  /** 返回在指定索引位置插入键值对后的新副本 */
  with(index: number, key: K, value: V) {
    const copy = new OrderedDict(this);
    copy.insert(index, key, value);
    return copy;
  }

  /** 获取指定键之前的键值对 */
  before(key: K) {
    const index = this.#keys.indexOf(key) - 1;
    if (index < 0) {
      return undefined;
    }
    return this.entryAt(index);
  }

  /** 在指定键之前设置新的键值对 */
  setBefore(key: K, newKey: K, value: V) {
    const index = this.#keys.indexOf(key);
    if (index === -1) {
      return this;
    }
    return this.insert(index, newKey, value);
  }

  /** 获取指定键之后的键值对 */
  after(key: K) {
    let index = this.#keys.indexOf(key);
    index = index === -1 || index === this.size - 1 ? -1 : index + 1;
    if (index === -1) {
      return undefined;
    }
    return this.entryAt(index);
  }

  /** 在指定键之后设置新的键值对 */
  setAfter(key: K, newKey: K, value: V) {
    const index = this.#keys.indexOf(key);
    if (index === -1) {
      return this;
    }
    return this.insert(index + 1, newKey, value);
  }

  /** 获取第一个键值对 */
  first() {
    return this.entryAt(0);
  }

  /** 获取最后一个键值对 */
  last() {
    return this.entryAt(-1);
  }

  /** 清空所有键值对 */
  override clear() {
    this.#keys = [];
    return super.clear();
  }

  /** 删除指定键的键值对 */
  override delete(key: K) {
    const deleted = super.delete(key);
    if (deleted) {
      this.#keys.splice(this.#keys.indexOf(key), 1);
    }
    return deleted;
  }

  /** 删除指定索引位置的键值对 */
  deleteAt(index: number) {
    const key = this.keyAt(index);
    if (key !== undefined) {
      return this.delete(key);
    }
    return false;
  }

  /** 获取指定索引位置的值 */
  at(index: number) {
    const key = at(this.#keys, index);
    if (key !== undefined) {
      return this.get(key);
    }
  }

  /** 获取指定索引位置的键值对 */
  entryAt(index: number): [K, V] | undefined {
    const key = at(this.#keys, index);
    if (key !== undefined) {
      return [key, this.get(key)!];
    }
  }

  /** 获取指定键的索引位置 */
  indexOf(key: K) {
    return this.#keys.indexOf(key);
  }

  /** 获取指定索引位置的键 */
  keyAt(index: number) {
    return at(this.#keys, index);
  }

  /** 从指定键开始，偏移指定数量后的值 */
  from(key: K, offset: number) {
    const index = this.indexOf(key);
    if (index === -1) {
      return undefined;
    }
    let dest = index + offset;
    if (dest < 0) dest = 0;
    if (dest >= this.size) dest = this.size - 1;
    return this.at(dest);
  }

  /** 从指定键开始，偏移指定数量后的键 */
  keyFrom(key: K, offset: number) {
    const index = this.indexOf(key);
    if (index === -1) {
      return undefined;
    }
    let dest = index + offset;
    if (dest < 0) dest = 0;
    if (dest >= this.size) dest = this.size - 1;
    return this.keyAt(dest);
  }

  /** 查找满足条件的第一个键值对 */
  find(predicate: (entry: [K, V], index: number, dictionary: OrderedDict<K, V>) => boolean, thisArg?: any) {
    let index = 0;
    for (const entry of this) {
      if (Reflect.apply(predicate, thisArg, [entry, index, this])) {
        return entry;
      }
      index++;
    }
    return undefined;
  }

  /** 查找满足条件的第一个键值对的索引 */
  findIndex(predicate: (entry: [K, V], index: number, dictionary: OrderedDict<K, V>) => boolean, thisArg?: any) {
    let index = 0;
    for (const entry of this) {
      if (Reflect.apply(predicate, thisArg, [entry, index, this])) {
        return index;
      }
      index++;
    }
    return -1;
  }

  /** 过滤满足条件的键值对，返回新的 OrderedDict */
  filter<KK extends K, VV extends V>(
    predicate: (entry: [K, V], index: number, dict: OrderedDict<K, V>) => entry is [KK, VV],
    thisArg?: any
  ): OrderedDict<KK, VV>;

  filter(
    predicate: (entry: [K, V], index: number, dictionary: OrderedDict<K, V>) => unknown,
    thisArg?: any
  ): OrderedDict<K, V>;

  filter(predicate: (entry: [K, V], index: number, dictionary: OrderedDict<K, V>) => unknown, thisArg?: any) {
    const entries: Array<[K, V]> = [];
    let index = 0;
    for (const entry of this) {
      if (Reflect.apply(predicate, thisArg, [entry, index, this])) {
        entries.push(entry);
      }
      index++;
    }
    return new OrderedDict(entries);
  }

  /** 映射每个键值对，返回新的 OrderedDict */
  map<U>(
    callbackfn: (entry: [K, V], index: number, dictionary: OrderedDict<K, V>) => U,
    thisArg?: any
  ): OrderedDict<K, U> {
    const entries: [K, U][] = [];
    let index = 0;
    for (const entry of this) {
      entries.push([entry[0], Reflect.apply(callbackfn, thisArg, [entry, index, this])]);
      index++;
    }
    return new OrderedDict(entries);
  }

  /** 累积计算所有键值对 */
  reduce(
    callbackfn: (
      previousValue: [K, V],
      currentEntry: [K, V],
      currentIndex: number,
      dictionary: OrderedDict<K, V>
    ) => [K, V]
  ): [K, V];
  reduce(
    callbackfn: (
      previousValue: [K, V],
      currentEntry: [K, V],
      currentIndex: number,
      dictionary: OrderedDict<K, V>
    ) => [K, V],
    initialValue: [K, V]
  ): [K, V];
  reduce<U>(
    callbackfn: (previousValue: U, currentEntry: [K, V], currentIndex: number, dictionary: OrderedDict<K, V>) => U,
    initialValue: U
  ): U;

  reduce<U>(
    ...args: [(previousValue: U, currentEntry: [K, V], currentIndex: number, dictionary: OrderedDict<K, V>) => U, U?]
  ) {
    const [callbackfn, initialValue] = args;
    let index = 0;
    let accumulator = initialValue ?? this.at(0)!;
    for (const entry of this) {
      if (index === 0 && args.length === 1) {
        accumulator = entry as any;
      } else {
        accumulator = Reflect.apply(callbackfn, this, [accumulator, entry, index, this]);
      }
      index++;
    }
    return accumulator;
  }

  /** 从右到左累积计算所有键值对 */
  reduceRight(
    callbackfn: (
      previousValue: [K, V],
      currentEntry: [K, V],
      currentIndex: number,
      dictionary: OrderedDict<K, V>
    ) => [K, V]
  ): [K, V];
  reduceRight(
    callbackfn: (
      previousValue: [K, V],
      currentEntry: [K, V],
      currentIndex: number,
      dictionary: OrderedDict<K, V>
    ) => [K, V],
    initialValue: [K, V]
  ): [K, V];
  reduceRight<U>(
    callbackfn: (previousValue: [K, V], currentValue: U, currentIndex: number, dictionary: OrderedDict<K, V>) => U,
    initialValue: U
  ): U;

  reduceRight<U>(
    ...args: [(previousValue: U, currentEntry: [K, V], currentIndex: number, dictionary: OrderedDict<K, V>) => U, U?]
  ) {
    const [callbackfn, initialValue] = args;
    let accumulator = initialValue ?? this.at(-1)!;
    for (let index = this.size - 1; index >= 0; index--) {
      const entry = this.at(index)!;
      if (index === this.size - 1 && args.length === 1) {
        accumulator = entry as any;
      } else {
        accumulator = Reflect.apply(callbackfn, this, [accumulator, entry, index, this]);
      }
    }
    return accumulator;
  }

  /** 返回排序后的新 OrderedDict */
  toSorted(compareFn?: (a: [K, V], b: [K, V]) => number): OrderedDict<K, V> {
    const entries = [...this.entries()].sort(compareFn);
    return new OrderedDict(entries);
  }

  /** 返回顺序颠倒的新 OrderedDict */
  toReversed(): OrderedDict<K, V> {
    const reversed = new OrderedDict<K, V>();
    for (let index = this.size - 1; index >= 0; index--) {
      const key = this.keyAt(index)!;
      const element = this.get(key)!;
      reversed.set(key, element);
    }
    return reversed;
  }

  /** 返回删除或插入元素后的新 OrderedDict */
  toSpliced(start: number, deleteCount?: number): OrderedDict<K, V>;
  toSpliced(start: number, deleteCount: number, ...items: [K, V][]): OrderedDict<K, V>;

  toSpliced(...args: [start: number, deleteCount: number, ...items: [K, V][]]) {
    const entries = [...this.entries()];
    entries.splice(...args);
    return new OrderedDict(entries);
  }

  /** 返回指定范围的新 OrderedDict */
  slice(start?: number, end?: number) {
    const result = new OrderedDict<K, V>();
    let stop = this.size - 1;

    if (start === undefined) {
      return result;
    }

    let actualStart = start;
    if (actualStart < 0) {
      actualStart += this.size;
    }

    if (end !== undefined && end > 0) {
      stop = end - 1;
    }

    for (let index = actualStart; index <= stop; index++) {
      const key = this.keyAt(index)!;
      const element = this.get(key)!;
      result.set(key, element);
    }
    return result;
  }

  /** 检查是否所有键值对都满足条件 */
  every(predicate: (entry: [K, V], index: number, dictionary: OrderedDict<K, V>) => unknown, thisArg?: any) {
    let index = 0;
    for (const entry of this) {
      if (!Reflect.apply(predicate, thisArg, [entry, index, this])) {
        return false;
      }
      index++;
    }
    return true;
  }

  /** 检查是否有键值对满足条件 */
  some(predicate: (entry: [K, V], index: number, dictionary: OrderedDict<K, V>) => unknown, thisArg?: any) {
    let index = 0;
    for (const entry of this) {
      if (Reflect.apply(predicate, thisArg, [entry, index, this])) {
        return true;
      }
      index++;
    }
    return false;
  }
}

/** 从 OrderedDict 类型中提取键类型 */
export type KeyOf<D extends OrderedDict<any, any>> = D extends OrderedDict<infer K, any> ? K : never;
/** 从 OrderedDict 类型中提取值类型 */
export type ValueOf<D extends OrderedDict<any, any>> = D extends OrderedDict<any, infer V> ? V : never;
/** 从 OrderedDict 类型中提取键值对类型 */
export type EntryOf<D extends OrderedDict<any, any>> = [KeyOf<D>, ValueOf<D>];
/** 从键值对类型中提取键类型 */
export type KeyFrom<E extends EntryOf<any>> = E[0];
/** 从键值对类型中提取值类型 */
export type ValueFrom<E extends EntryOf<any>> = E[1];

/** 安全地获取数组指定索引的元素（支持负数索引） */
function at<T>(array: ArrayLike<T>, index: number): T | undefined {
  if ('at' in Array.prototype) {
    return Array.prototype.at.call(array, index);
  }
  const actualIndex = toSafeIndex(array, index);
  return actualIndex === -1 ? undefined : array[actualIndex];
}

/** 将索引转换为安全的数组索引 */
function toSafeIndex(array: ArrayLike<any>, index: number) {
  const length = array.length;
  const relativeIndex = toSafeInteger(index);
  const actualIndex = relativeIndex >= 0 ? relativeIndex : length + relativeIndex;
  return actualIndex < 0 || actualIndex >= length ? -1 : actualIndex;
}

/** 将数字转换为安全的整数 */
function toSafeInteger(number: number) {
  // eslint-disable-next-line no-self-compare
  return number !== number || number === 0 ? 0 : Math.trunc(number);
}
