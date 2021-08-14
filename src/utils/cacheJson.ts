import NodeCache from 'node-cache';
import superjson from 'superjson';

const cache = new NodeCache({ stdTTL: 60, checkperiod: 30 });

export async function cacheJson<T>(
  key: string,
  fn: () => Promise<T>
): Promise<string> {
  const cached = cache.get<string>(key);
  if (!cached) {
    const data = await fn();
    const serial = superjson.stringify(data);
    cache.set(key, serial);
    return serial;
  } else {
    return cached;
  }
}
