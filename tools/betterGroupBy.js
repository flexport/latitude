/**
 * TEAM: frontend_infra
 *
 * @flow strict
 */

export default function betterGroupBy<T, K>(
  values: $ReadOnlyArray<T>,
  keyFn: (value: T) => K | null
): Map<K, Array<T>> {
  const groups = new Map();
  values.forEach(value => {
    const key = keyFn(value);
    if (key == null) {
      return;
    }
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    const arr = groups.get(key);
    if (arr) {
      arr.push(value);
    }
  });
  return groups;
}
