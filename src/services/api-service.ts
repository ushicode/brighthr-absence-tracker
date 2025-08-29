import axios from "axios";
import type { Absence, ConflictResponse } from "../interfaces/absence";

const API_BASE_URL: string = "https://front-end-kata.brighthr.workers.dev/api";

export const apiService = {
  getAbsences: async (): Promise<Absence[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/absences`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch absences:", error);
      throw new Error("Unable to fetch absences. Please try again later.");
    }
  },

  checkConflict: async (absenceId: number): Promise<ConflictResponse> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/conflict/${absenceId}`);
      return response.data;
    } catch (error) {
      console.error(
        `Failed to check conflicts for absence ID ${absenceId}:`,
        error
      );
      throw new Error("Unable to check conflicts. Please try again later.");
    }
  },
};
