export default class Max {
  constructor(private items: number[] = []) {}

  calculate(): number | undefined {
    if (this.items.length === 0) return undefined;

    return Math.max(...this.items);
  }
}
