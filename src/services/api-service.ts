import axios from 'axios';
import type { Absence, ConflictResponse } from '../interfaces/absence';

const API_BASE_URL: string = 'https://front-end-kata.brighthr.workers.dev/api';

export class ApiService {
     public static async getAbsences(): Promise<Absence[]> {
    try {
      const response = await axios.get<Absence[]>(`${API_BASE_URL}/absences`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch absences:', error);
      throw new Error('Unable to fetch absences. Please try again later.');
    }
  }

  public static async checkConflicts(absenceId: number): Promise<ConflictResponse> {
    try {
      const response = await axios.post<ConflictResponse>(`${API_BASE_URL}/conflicts/${absenceId}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to check conflicts for absence ${absenceId}:`, error);
      throw new Error('Unable to check conflicts. Please try again later.');
    }
  }
}