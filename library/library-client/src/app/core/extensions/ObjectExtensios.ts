declare global {
  interface Object {
    cleanProperties<T extends object>(this: T): Partial<T>;
  }
}

Object.prototype.cleanProperties = function <T extends object>(
  this: T
): Partial<T> {
  Object.keys(this).forEach((key) => {
    const value = this[key as keyof T];
    if (value === undefined || value === null) {
      delete this[key as keyof T];
    }
  });
  return this;
};

export {};
