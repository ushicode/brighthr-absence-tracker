export type AbsenceType =
  | "SICKNESS"
  | "ANNUAL_LEAVE"
  | "MEDICAL"
  | "MATERNITY"
  | "COMPASSIONATE_LEAVE";



export type SortField = 'startDate' | 'endDate' | 'employeeName' | 'absenceType' | 'status';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export type SortAction = 
  | { type: 'SET_SORT'; field: SortField }
  | { type: 'TOGGLE_DIRECTION' };