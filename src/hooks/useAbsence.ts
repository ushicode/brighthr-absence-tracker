import { useQuery, useQueries } from '@tanstack/react-query';
import type { Absence } from '../interfaces/absence';
import {apiService } from '../services/api-service';

export const useAbsences = () => {
  const absencesQuery = useQuery({
    queryKey: ['absences'],
    queryFn: apiService.getAbsences,
  });

  const conflictQueries = useQueries({
    queries: (absencesQuery.data || []).map((absence: Absence) => ({
      queryKey: ['conflict', absence.id],
      queryFn: () => apiService.checkConflict(absence.id),
      enabled: !!absencesQuery.data,
      retry: false, // I didn't see the need in retrying when conflict check fails
      refetchOnWindowFocus: false, 
    })),
  });

  const absencesWithConflicts = absencesQuery.data?.map((absence: Absence, index: number) => ({
    ...absence,
    conflicts: conflictQueries[index]?.data?.conflicts || false,
  }));

  return {
    absences: absencesWithConflicts,
    isLoading: absencesQuery.isLoading,
    error: absencesQuery.error,
  };
};