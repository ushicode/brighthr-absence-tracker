import React, { useState } from 'react'
import { useAbsences } from '../hooks/useAbsence';
import { formatDate, calculateEndDate, sortAbsences } from '../helpers';
import type { SortField } from '../types';
import { useSort } from '../hooks/useSort';
import type { Absence, Employee } from '../interfaces/absence';
import { sortDirection } from '../constants';
import { MoveDown, MoveUp } from 'lucide-react';
import EmployeeAbsenceModal from './EmployeeAbsenceModal';


const AbsenceTable: React.FC = () => {

    const { absences, isLoading, error } = useAbsences();
    const { sortConfig, setSortField, toggleSortDirection } = useSort();

    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading absences table. Please refresh the page.</div>;
    if (!absences || absences.length === 0) return <div>No absences found</div>;

    const sortedAbsences = sortAbsences(absences, sortConfig);

    // todo: move to helpers
    const formatAbsenceType = (absenceType: string) => {
        return absenceType.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
    };

    const handleSortClick = (field: SortField) => {
        return field === sortConfig.field ? toggleSortDirection() : setSortField(field);
    };

    const renderSortIndicator = (field: SortField) => {
        if (field !== sortConfig.field) return null;
        return sortConfig.direction === sortDirection.ASC ? <MoveUp strokeWidth={3} size={12} /> : <MoveDown strokeWidth={3} size={12} />;
    }

    const handleEmployeeNameClick = (employee: Employee) => {
        setSelectedEmployee(employee);
        console.log(selectedEmployee);
    }

    return (
        <div>
          <div>
              <table>
                <thead>
                    <tr>
                        <td>#</td>
                        <th onClick={() => handleSortClick('startDate')}>
                            Start Date {renderSortIndicator('startDate')}
                        </th>
                        <th onClick={() => handleSortClick('endDate')}>
                            End Date {renderSortIndicator('endDate')}
                        </th>
                        <th onClick={() => handleSortClick('employeeName')}>
                            Employee Name {renderSortIndicator('employeeName')}
                        </th>
                        <th>Status</th>
                        <th onClick={() => handleSortClick('absenceType')}>
                            Absence Type {renderSortIndicator('absenceType')}
                        </th>
                        <th>Conflict</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sortedAbsences.map((absence: Absence) => (
                            <tr key={absence.id}>
                                <td>{absence.id + 1}</td>
                                <td>{formatDate(absence.startDate)}</td>
                                <td>{formatDate(calculateEndDate(absence.startDate, absence.days))}</td>
                                <td onClick={() => handleEmployeeNameClick(absence.employee)} >
                                    {`${absence.employee.firstName} ${absence.employee.lastName}`}</td>
                                <td>
                                    <span title="Status">
                                        {absence.approved ? '🟢 Approved' : '🟡 Pending'}
                                    </span>
                                </td>
                                <td>{formatAbsenceType(absence.absenceType)}</td>
                                <td>
                                    <span title={absence.conflicts ? 'Conflict detected' : 'No conflict'}>
                                        {absence.conflicts ? '⚠️ Conflict' : 'No Conflict'}
                                    </span>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
          </div>
          
            { //Modal for employee details
                selectedEmployee && (
                    <EmployeeAbsenceModal
                        isOpen={!!selectedEmployee}
                        onRequestClose={() => setSelectedEmployee(null)}
                        employee={selectedEmployee}
                        absences={absences}
                        contentLabel={`Absence details for ${selectedEmployee.firstName} ${selectedEmployee.lastName}`}
                    />
                )
            }
        </div>
    )
}

export default AbsenceTable;
