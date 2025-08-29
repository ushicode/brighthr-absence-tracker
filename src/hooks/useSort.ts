import { useContext } from "react";
import { SortContext } from "../constants";

export const useSort = () => {
  const context = useContext(SortContext);
  if (context === undefined) {
    throw new Error('useSort must be used within a SortProvider');
  }
  return context;
};