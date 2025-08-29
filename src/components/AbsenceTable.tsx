import React, { useEffect } from 'react'
import { ApiService } from '../services/api-service';
import { useQuery } from '@tanstack/react-query';

const AbsenceTable: React.FC = () => {

    const { data, error, isLoading } = useQuery({
        queryKey: ['absences'],
        queryFn: ApiService.getAbsences
    });

    console.log(data);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Employee Name</th>
                        <th>Status</th>
                        <th>Absence Type</th>
                        <th>Conflict</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>2024-06-01</td>
                        <td>2024-06-05</td>
                        <td>Firstname lastname</td>
                        <td>Approved</td>
                        <td>Vacation</td>
                        <td>X</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default AbsenceTable;
