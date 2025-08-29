import { createContext } from "react";
import type { SortContextType } from "../interfaces";

export const SortContext = createContext<SortContextType | undefined>(undefined);
  

export const sortDirection = {
  ASC: 'asc',
  DESC: 'desc',
} as const;