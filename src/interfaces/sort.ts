import type { SortConfig, SortField } from "../types";

export interface SortState {
  sortConfig: SortConfig;
}


export interface SortContextType {
  sortConfig: SortConfig;
  setSortField: (field: SortField) => void;
  toggleSortDirection: () => void;
}