interface Array<T> {
  selectNumbers(
    predicate: (value: any, index: number, array: any[]) => any
  ): number[];
  distinct(): number[];
}

Array.prototype.selectNumbers = function (
  predicate: (value: any, index: number, array: any[]) => any
): number[] {
  return this.map(predicate).filter(
    (item): item is number => typeof item === 'number'
  );
};

Array.prototype.distinct = function (): number[] {
  return Array.from(new Set(this));
};
