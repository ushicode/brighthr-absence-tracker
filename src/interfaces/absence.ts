type AbsenceType =
  | "SICKNESS"
  | "ANNUAL_LEAVE"
  | "MEDICAL"
  | "MATERNITY"
  | "COMPASSIONATE_LEAVE";


interface Employee {
  id: string;
  firstName: string;
  lastName: string;
}

export interface Absence {
  id: number;
  startDate: string;
  days: number;
  absenceType: AbsenceType;
  employee: Employee;
  approved: boolean;
  conflicts?: boolean;
}

export interface ConflictResponse {
  conflicts: boolean;
}