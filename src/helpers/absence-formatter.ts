export const formatAbsenceType = (absenceType: string) => {
    return absenceType.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
};