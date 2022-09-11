import { Stats } from '../stats/stats-calculator.js';

export interface FilterCriteria {
  onContract?: boolean;
  groupBy?: string[];
}

export interface SummaryStatsResponse {
  summaryStats: SummaryStatsGroup[];
}

export interface SummaryStatsGroup {
  stats: Stats;
  group?: Group;
}

export interface Group {
  department?: string;
  sub_department?: string;
}
