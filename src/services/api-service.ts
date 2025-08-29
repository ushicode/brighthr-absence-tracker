import axios from 'axios';

const API_BASE_URL: string = 'https://front-end-kata.brighthr.workers.dev/api';

export class ApiService {
     public static async getAbsences(): Promise<any[]> {
    try {
      const response = await axios.get<any[]>(`${API_BASE_URL}/absences`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch absences:', error);
      throw new Error('Unable to fetch absences. Please try again later.');
    }
  }

  public static async checkConflicts(absenceId: number): Promise<any> {
    try {
      const response = await axios.post<any>(`${API_BASE_URL}/conflicts/${absenceId}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to check conflicts for absence ${absenceId}:`, error);
      throw new Error('Unable to check conflicts. Please try again later.');
    }
  }
}