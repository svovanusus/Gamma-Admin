export default class StorageService {
  private constructor() {}

  public static save<T>(key: string, val: T): void {
    window.localStorage.setItem(key, JSON.stringify(val));
  }

  public static get<T>(key: string): T {
    const strVal = window.localStorage.getItem(key);
    if (!strVal) return null;
    return JSON.parse(strVal) as T;
  }
}