export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-GB");
};

export const calculateEndDate = (startDate: string, days: number): string => {
  const date = new Date(startDate);
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
};
