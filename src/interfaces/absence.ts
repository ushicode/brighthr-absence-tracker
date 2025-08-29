import type { AbsenceType } from "../types";

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