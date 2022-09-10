import StatsCalculator from './stats-calculator.js';

describe('Stats Calculator', () => {
  it('calculates summary stats of list of numbers', () => {
    const items: number[] = [1, 2, 3, 4];
    const sc = new StatsCalculator(items);
    const summary = sc.calculate();
    expect(summary).toEqual({
      mean: 2.5,
      max: 4,
      min: 1,
    });
  });

  it('calculates mean of list of numbers upto 2 decimal places', () => {
    const items: number[] = [2, 2, 3];
    const sc = new StatsCalculator(items);
    const summary = sc.calculate();
    expect(summary).toEqual({
      mean: 2.33,
      max: 3,
      min: 2,
    });
  });

  it('handles empty list', () => {
    const items: number[] = [];
    const sc = new StatsCalculator(items);
    const summary = sc.calculate();
    expect(summary).toEqual({
      mean: undefined,
      max: undefined,
      min: undefined,
    });
  });
});
