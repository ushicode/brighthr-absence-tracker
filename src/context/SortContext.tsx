import { type ReactNode, useReducer } from "react";
import type { SortAction, SortField } from "../types";
import type { SortState } from "../interfaces";
import { SortContext, sortDirection } from "../constants";


const sortReducer = (state: SortState, action: SortAction): SortState => {
  switch (action.type) {
    case 'SET_SORT':
      return {
        sortConfig: {
          field: action.field,
          direction: state.sortConfig.field === action.field
            ? state.sortConfig.direction
            : sortDirection.ASC,
        },
      };
    case 'TOGGLE_DIRECTION':
      return {
        sortConfig: {
          ...state.sortConfig,
          direction: state.sortConfig.direction === sortDirection.ASC ? sortDirection.DESC : sortDirection.ASC,
        },
      };
    default:
      return state;
  }
};


export const SortProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(sortReducer, {
    sortConfig: { field: 'startDate', direction: sortDirection.ASC },
  });

  const setSortField = (field: SortField) => {
    dispatch({ type: 'SET_SORT', field });
  };

  const toggleSortDirection = () => {
    dispatch({ type: 'TOGGLE_DIRECTION' });
  };

  const value = { sortConfig: state.sortConfig, setSortField, toggleSortDirection };
  return (
    <SortContext.Provider value={value}>
      {children}
    </SortContext.Provider>
  );
};
