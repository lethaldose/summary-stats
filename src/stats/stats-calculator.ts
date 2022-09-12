import Mean from './mean.js';
import Max from './max.js';
import Min from './min.js';

export interface SummaryStats {
  mean: number;
  min: number;
  max: number;
}

export default class StatsCalculator {
  constructor(private items: number[] = []) {}

  calculate(): SummaryStats {
    const mean = new Mean(this.items).calculate();
    const max = new Max(this.items).calculate();
    const min = new Min(this.items).calculate();
    return {
      mean,
      max,
      min,
    } as SummaryStats;
  }
}
