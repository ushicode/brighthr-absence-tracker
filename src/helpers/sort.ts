import type { Absence } from "../interfaces/absence";

type SortField = 'startDate' | 'endDate' | 'employeeName' | 'absenceType' | 'status';
type SortDirection = 'asc' | 'desc';

interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export const sortAbsences = (absences: Absence[], sortConfig: SortConfig): Absence[] => {
  return [...absences].sort((a, b) => {
    let aValue;
    let bValue;

    switch (sortConfig.field) {
      case 'startDate':
        aValue = new Date(a.startDate);
        bValue = new Date(b.startDate);
        break;
      case 'endDate':
        aValue = new Date(a.startDate);
        aValue.setDate(aValue.getDate() + a.days);
        bValue = new Date(b.startDate);
        bValue.setDate(bValue.getDate() + b.days);
        break;
      case 'employeeName':
        aValue = `${a.employee.firstName} ${a.employee.lastName}`.toLowerCase();
        bValue = `${b.employee.firstName} ${b.employee.lastName}`.toLowerCase();
        break;
      case 'absenceType':
        aValue = a.absenceType;
        bValue = b.absenceType;
        break;
      case 'status':
        aValue = a.approved;
        bValue = b.approved;
        break;
      default:
        return 0;
    }

    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
};