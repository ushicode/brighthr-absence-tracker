import React from 'react'
import { useAbsences } from '../hooks/useAbsence';

const AbsenceTable: React.FC = () => {

    const { absences, isLoading, error } = useAbsences();

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error loading absences table. Please refresh the page.</div>;
    }

    const formatAbsenceType = (absenceType: string) => {
        return absenceType.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
    };

    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('en-GB');
    };

    const calculateEndDate = (startDate: string, days: number): string => {
        const date = new Date(startDate);
        date.setDate(date.getDate() + days);
        return date.toISOString().split('T')[0];
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <td>#</td>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Employee Name</th>
                        <th>Status</th>
                        <th>Absence Type</th>
                        <th>Conflict</th>
                    </tr>
                </thead>
                <tbody>
                    {absences && absences.length > 0 ? (
                        absences.map((absence) => (
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
                                    {absence.conflicts ? '⚠️ Conflict' : 'No Conflict' }
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td>
                                No absences found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default AbsenceTable;
