import { sortDirection } from '../../constants';
import { formatDate, calculateEndDate, formatAbsenceType, sortAbsences } from '../../helpers';
import type { Absence } from '../../interfaces';
import type { SortConfig } from '../../types';


describe('Unit Testing Helper Functions', () => {
  
  describe('formatDate', () => {
    test('formats ISO date string to DD/MM/YYYY', () => {
      const isoDate = '2020-03-31T06:15:23.316Z';
      const result = formatDate(isoDate);
      expect(result).toBe('31/03/2020');
    });

    test('formats different ISO date correctly', () => {
      const isoDate = '2023-12-25T10:30:00.000Z';
      const result = formatDate(isoDate);
      expect(result).toBe('25/12/2023');
    });

    test('handles date string without time', () => {
      const dateString = '2023-01-01';
      const result = formatDate(dateString);
      expect(result).toBe('01/01/2023');
    });
  });

  describe('calculateEndDate', () => {
    test('calculates end date correctly for weekdays', () => {
      const startDate = '2023-10-02'; // Monday
      const days = 3;
      const result = calculateEndDate(startDate, days);
      expect(result).toBe('2023-10-05'); // Thursday (3 business days later)
    });

    test('calculates end date for single day', () => {
      const startDate = '2023-10-02'; // Monday
      const days = 1;
      const result = calculateEndDate(startDate, days);
      expect(result).toBe('2023-10-03'); // Tuesday
    });

    test('handles start date on Friday with multiple days', () => {
      const startDate = '2023-10-06'; // Friday
      const days = 3;
      const result = calculateEndDate(startDate, days);
      expect(result).toBe('2023-10-11'); // Wednesday (my new func will skip weekends)
    });
  });

  describe('formatAbsenceType', () => {
    test('converts ANNUAL_LEAVE to readable format', () => {
      const result = formatAbsenceType('ANNUAL_LEAVE');
      expect(result).toBe('Annual Leave');
    });

    test('converts SICK_LEAVE to readable format', () => {
      const result = formatAbsenceType('SICK_LEAVE');
      expect(result).toBe('Sick Leave');
    });

    test('converts MATERNITY_LEAVE to readable format', () => {
      const result = formatAbsenceType('MATERNITY_LEAVE');
      expect(result).toBe('Maternity Leave');
    });

    test('converts PERSONAL_LEAVE to readable format', () => {
      const result = formatAbsenceType('PERSONAL_LEAVE');
      expect(result).toBe('Personal Leave');
    });

    test('handles single word absence type', () => {
      const result = formatAbsenceType('TRAINING');
      expect(result).toBe('Training');
    });
  });

  describe('sortAbsences', () => {
    const mockAbsences: Absence[] = [
      {
        id: 1,
        startDate: '2023-10-01',
        days: 5,
        absenceType: "COMPASSIONATE_LEAVE",
        employee: { id: '6dc958b7-0aea-45d6-b4cc-ce384815dc17', firstName: 'Alice', lastName: 'Smith' },
        approved: true,
        conflicts: false,
      },
      {
        id: 2,
        startDate: '2023-09-15',
        days: 3,
        absenceType: "SICKNESS",
        employee: { id: '6dc958b7-0aea-45d6-b4cc-ce384815dc17', firstName: 'Bob', lastName: 'Johnson' },
        approved: false,
        conflicts: true,
      },
      {
        id: 3,
        startDate: '2023-11-01',
        days: 2,
        absenceType: "ANNUAL_LEAVE",
        employee: { id: '6ebff517-f398-4d23-9ed3-a0f14bfa3858', firstName: 'Charlie', lastName: 'Brown' },
        approved: true,
        conflicts: false,
      },
    ];

    test('sorts by startDate in ascending order', () => {
      const sortConfig: SortConfig = {
        field: 'startDate',
        direction: sortDirection.ASC,
      };
      
      const result = sortAbsences(mockAbsences, sortConfig);
      
      expect(result[0].startDate).toBe('2023-09-15');
      expect(result[1].startDate).toBe('2023-10-01');
      expect(result[2].startDate).toBe('2023-11-01');
    });

    test('sorts by startDate in descending order', () => {
      const sortConfig: SortConfig = {
        field: 'startDate',
        direction: sortDirection.DESC,
      };
      
      const result = sortAbsences(mockAbsences, sortConfig);
      
      expect(result[0].startDate).toBe('2023-11-01');
      expect(result[1].startDate).toBe('2023-10-01');
      expect(result[2].startDate).toBe('2023-09-15');
    });

    test('sorts by employeeName in ascending order', () => {
      const sortConfig: SortConfig = {
        field: 'employeeName',
        direction: sortDirection.ASC,
      };
      
      const result = sortAbsences(mockAbsences, sortConfig);
      
      expect(result[0].employee.firstName).toBe('Alice');
      expect(result[1].employee.firstName).toBe('Bob');
      expect(result[2].employee.firstName).toBe('Charlie');
    });

    test('sorts by date in ascending order', () => {
      const sortConfig: SortConfig = {
        field: 'startDate',
        direction: sortDirection.ASC,
      };
      
      const result = sortAbsences(mockAbsences, sortConfig);
      
      expect(result[0].startDate).toBe('2023-09-15');
      expect(result[1].startDate).toBe('2023-10-01');
      expect(result[2].startDate).toBe('2023-11-01');
    });

    test('does not mutate original array', () => {
      const sortConfig: SortConfig = {
        field: 'startDate',
        direction: sortDirection.ASC,
      };
      
      const originalOrder = mockAbsences.map(a => a.id);
      sortAbsences(mockAbsences, sortConfig);
      const afterSortOrder = mockAbsences.map(a => a.id);
      
      expect(originalOrder).toEqual(afterSortOrder);
    });
  });
});