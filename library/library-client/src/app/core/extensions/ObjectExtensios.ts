export function cleanObjectProperties<T extends object>(obj: T): Partial<T> {
  Object.keys(obj).forEach((key) => {
    const value = obj[key as keyof T];
    if (value === undefined || value === null) {
      delete obj[key as keyof T];
    }
  });
  return obj;
}
