export default class Mean {
  fixedPrecision = 2;
  constructor(private items: number[] = []) {}

  calculate(): number | undefined {
    if (this.items.length === 0) return undefined;

    const mean = this.items.reduce((a, b) => a + b, 0) / this.items.length;
    return Number(mean.toFixed(this.fixedPrecision));
  }
}
