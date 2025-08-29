import React from 'react'
import { useAbsences } from '../hooks/useAbsence';
import { formatDate, calculateEndDate, sortAbsences } from '../helpers';
import type { SortField } from '../types';
import { useSort } from '../hooks/useSort';
import type { Absence } from '../interfaces/absence';
import { sortDirection } from '../constant';
import { MoveDown, MoveUp } from 'lucide-react';

const AbsenceTable: React.FC = () => {

    const { absences, isLoading, error } = useAbsences();
    const { sortConfig, setSortField, toggleSortDirection } = useSort();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading absences table. Please refresh the page.</div>;
    if (!absences || absences.length === 0) return <div>No absences found</div>;

    const sortedAbsences = sortAbsences(absences, sortConfig);

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


    return (
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
                                <td>{`${absence.employee.firstName} ${absence.employee.lastName}`}</td>
                                <td>
                                    <span>
                                        {absence.approved ? '🟢 Approved' : '🟡 Pending'}
                                    </span>
                                </td>
                                <td>{formatAbsenceType(absence.absenceType)}</td>
                                <td>
                                    {absence.conflicts ? '⚠️ Conflict' : 'No Conflict'}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AbsenceTable;
