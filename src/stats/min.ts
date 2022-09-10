export default class Min {
  constructor(private items: number[] = []) {}

  calculate(): number | undefined {
    if (this.items.length === 0) return undefined;

    return Math.min(...this.items);
  }
}
