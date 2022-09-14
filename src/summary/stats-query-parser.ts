import { FilterCriteria, StatsQuery, GroupCriteria } from './types.js';

export class StatsQueryParser {
  constructor(private query: StatsQuery) {}

  filterCriteria(): FilterCriteria {
    return {
      onContract: this.query.onContract ? this.query.onContract.toLowerCase() === 'true' : undefined,
    } as FilterCriteria;
  }
  groupByCriteria(): GroupCriteria {
    const groupBy = this.query.groupBy;
    const groupByParams = Array.isArray(groupBy) ? groupBy : [groupBy].filter((g) => g);
    return {
      department: groupByParams.includes('department'),
      subDepartment: groupByParams.includes('subDepartment'),
    } as GroupCriteria;
  }
}
