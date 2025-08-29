import { createContext } from "react";
import type { SortContextType } from "../interfaces";

export const SortContext = createContext<SortContextType | undefined>(undefined);
  
export const sortDirection = {
  ASC: 'asc',
  DESC: 'desc',
} as const;


// Custom styles for react-modal; ideally should be in a separate styles file but keeping here for simplicity
export const modalCustomStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};