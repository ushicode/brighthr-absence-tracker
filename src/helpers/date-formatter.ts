export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-GB");
};


/*
-My initial implementation - Not skipping weekends.
-Had to revisit after writing tests for calculateEndDate function.

export const calculateEndDate = (startDate: string, days: number): string => {
  const date = new Date(startDate);
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
};
*/

// Fix to skip weekends (Saturday and Sunday)
export const calculateEndDate = (startDate: string, days: number): string => {
   let businessDaysAdded = 0;
  const start = new Date(startDate);
  const currentDate = new Date(start);

  while (businessDaysAdded < days) {
    currentDate.setDate(currentDate.getDate() + 1);
    
    // Skip weekends
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      businessDaysAdded++;
    }
  }

  return currentDate.toISOString().split('T')[0];
};