import React from "react";
import { modalCustomStyles } from "../constants";
import { formatDate, calculateEndDate, formatAbsenceType } from "../helpers";
import type { Absence, Employee } from "../interfaces";
import Modal from 'react-modal';

interface EmployeeAbsenceModalProps {
    isOpen: boolean;
    onRequestClose: () => void | null;
    employee: Employee | null;
    absences: Absence[];
    contentLabel?: string;
}

const EmployeeAbsenceModal: React.FC<EmployeeAbsenceModalProps> = ({
    isOpen,
    onRequestClose,
    employee,
    absences,
    contentLabel = "Employee Absence Details"
}) => {

    if (!employee) {
        alert("No employee data available");
        return null;
    }

    const employeeAbsences = absences.filter(absence => absence.employee.id === employee.id);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={contentLabel}
            style={modalCustomStyles}
        >
          <div>
           
              <h2>Absences for: {employee.firstName} {employee.lastName}</h2>
            {employeeAbsences.length === 0 ? (
                <p>No absences found for this employee.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Absence Type</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeAbsences.map(absence => (
                            <tr key={absence.id}>
                                <td>{formatDate(absence.startDate)}</td>
                                <td>{formatDate(calculateEndDate(absence.startDate, absence.days))}</td>
                                <td>{formatAbsenceType(absence.absenceType)}</td>
                                <td>{absence.approved ? '🟢 Approved' : '🟡 Pending'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
          </div>
          
           <div style={{ textAlign: 'right', marginTop: '20px' }}>
             <button onClick={onRequestClose} style={{ float: 'right' }}>Close</button>
           </div>
        </Modal>
    );
};

export default EmployeeAbsenceModal;
