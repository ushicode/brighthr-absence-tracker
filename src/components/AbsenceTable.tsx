import React, { useState } from 'react'
import { useAbsences } from '../hooks/useAbsence';
import { formatDate, calculateEndDate, sortAbsences, formatAbsenceType } from '../helpers';
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

    const handleSortClick = (field: SortField) => {
        return field === sortConfig.field ? toggleSortDirection() : setSortField(field);
    };

    const renderSortIndicator = (field: SortField) => {
        if (field !== sortConfig.field) return null;
        return (
            <span className="sort-indicator">
                {sortConfig.direction === sortDirection.ASC ? 
                    <MoveUp strokeWidth={3} size={12} /> : 
                    <MoveDown strokeWidth={3} size={12} />
                }
            </span>
        );
    }

    const handleEmployeeNameClick = (employee: Employee) => {
        setSelectedEmployee(employee);
        console.log(selectedEmployee);
    }

    const getConflictClassName = (conflicts: boolean): string => {
        return conflicts ? 'conflict-indicator conflict-detected' : 'conflict-indicator no-conflict';
    }

    const getConflictText = (conflicts: boolean): string => {
        return conflicts ? '⚠️ Conflict' : 'No Conflict';
    }

    return (
        <div className="absence-table-container">
            <div>
                <table className="absence-table">
                    <thead className="absence-table-header">
                        <tr>
                            <td>#</td>
                            <th className="sortable-header" onClick={() => handleSortClick('startDate')}>
                                Start Date {renderSortIndicator('startDate')}
                            </th>
                            <th className="sortable-header" onClick={() => handleSortClick('endDate')}>
                                End Date {renderSortIndicator('endDate')}
                            </th>
                            <th className="sortable-header" onClick={() => handleSortClick('employeeName')}>
                                Employee Name {renderSortIndicator('employeeName')}
                            </th>
                            <th>Status</th>
                            <th className="sortable-header" onClick={() => handleSortClick('absenceType')}>
                                Absence Type {renderSortIndicator('absenceType')}
                            </th>
                            <th>Conflict</th>
                        </tr>
                    </thead>
                    
                    <tbody className="absence-table-body">
                        {
                            sortedAbsences.map((absence: Absence) => (
                                <tr key={absence.id}>
                                    <td>{absence.id + 1}</td>
                                    <td>{formatDate(absence.startDate)}</td>
                                    <td>{formatDate(calculateEndDate(absence.startDate, absence.days))}</td>
                                    <td className="employee-name" onClick={() => handleEmployeeNameClick(absence.employee)}>
                                        {`${absence.employee.firstName} ${absence.employee.lastName}`}
                                    </td>
                                    <td>
                                        <span className={`status-indicator ${absence.approved ? 'status-approved' : 'status-pending'}`}>
                                            {absence.approved ? '🟢 Approved' : '🟡 Pending'}
                                        </span>
                                    </td>
                                    <td className="absence-type">
                                        {formatAbsenceType(absence.absenceType)}
                                    </td>
                                    <td>
                                        <span className={getConflictClassName(absence.conflicts as boolean)} title={absence.conflicts ? 'Conflict detected' : 'No conflict'}>
                                            {getConflictText(absence.conflicts as boolean)}
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