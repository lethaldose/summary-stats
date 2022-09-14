import { SummaryStats } from '../stats/stats-calculator.js';

export interface FilterCriteria {
  onContract?: boolean | undefined;
}

export interface GroupCriteria {
  department?: boolean;
  subDepartment?: boolean;
}

export interface StatsQuery {
  onContract?: string | undefined;
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
