import { SummaryStats } from '../stats/stats-calculator.js';

export interface FilterCriteria {
  onContract?: boolean;
}

export interface GroupCriteria {
  department?: boolean;
  subDepartment?: boolean;
}

export interface StatsQuery {
  onContract?: boolean;
  groupBy: string | string[];
}

export interface SummaryStatsResponse {
  summaryStats: SummaryStatsGroup[];
}

export interface SummaryStatsGroup {
  stats: SummaryStats;
  group?: Group;
}

export interface Group {
  department?: string;
  sub_department?: string;
}
