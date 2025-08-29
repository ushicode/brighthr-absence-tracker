import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SortProvider } from '../context/SortContext';
import AbsenceTable from '../components/AbsenceTable';
import { apiService } from '../services/api-service';
import type { Absence } from '../interfaces/absence';

// Mock the API service
jest.mock('../services/api-service', () => ({
  apiService: {
    getAbsences: jest.fn(),
    checkConflict: jest.fn(),
  },
}));

const mockAbsences: Absence[] = [
  {
    id: 5,
    startDate: "2020-03-31T06:15:23.316Z",
    days: 3,
    absenceType: "ANNUAL_LEAVE",
    employee: {
      firstName: "Alexi",
      lastName: "Schramm",
      id: "8be1c549-fb91-4c8f-9cfe-5b5c017f26bf"
    },
    approved: true,
    conflicts: false,
  },
];

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <SortProvider>
        {ui}
      </SortProvider>
    </QueryClientProvider>
  );
};

describe('AbsenceTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Set up default mocks
    (apiService.getAbsences as jest.Mock).mockResolvedValue(mockAbsences);
    (apiService.checkConflict as jest.Mock).mockResolvedValue({ conflicts: false });
  });

  test('renders loading state initially', () => {
    renderWithProviders(<AbsenceTable />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test('renders absence data after loading', async () => {
    renderWithProviders(<AbsenceTable />);

    // Wait for the employee name to appear
    await waitFor(() => {
      expect(screen.getByText("Alexi Schramm")).toBeInTheDocument();
    });

    expect(screen.getByText("31/03/2020")).toBeInTheDocument();
    expect(screen.getByText("03/04/2020")).toBeInTheDocument();
    expect(screen.getByText("Annual Leave")).toBeInTheDocument();
    expect(screen.getByText("🟢 Approved")).toBeInTheDocument();
  });

  test('handles API error gracefully', async () => {
    (apiService.getAbsences as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    renderWithProviders(<AbsenceTable />);

    await waitFor(() => {
      expect(screen.getByText(/Error loading absences/i)).toBeInTheDocument();
    });
  });

  test('shows conflict indicator when absence has conflicts', async () => {
    (apiService.checkConflict as jest.Mock).mockResolvedValue({ conflicts: true });

    renderWithProviders(<AbsenceTable />);

    // Wait for data to load and conflict check to complete
    await waitFor(() => {
      expect(screen.getByText("Alexi Schramm")).toBeInTheDocument();
    });

    // Verify conflict check was called with correct ID (5, not 1)
    expect(apiService.checkConflict).toHaveBeenCalledWith(5);

    // Wait for conflict indicator to appear
    await waitFor(() => {
      expect(screen.getByText("⚠️ Conflict")).toBeInTheDocument();
    });
  });

  test('shows no conflict indicator when absence has no conflicts', async () => {
    // Mock conflict check to return false (already set in beforeEach above)
    renderWithProviders(<AbsenceTable />);

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText("Alexi Schramm")).toBeInTheDocument();
    });

    // Verify conflict check was called with correct ID (5, not 1)
    expect(apiService.checkConflict).toHaveBeenCalledWith(5);

    // Wait for no conflict indicator to appear
    await waitFor(() => {
      expect(screen.getByText("No Conflict")).toBeInTheDocument();
    });
  });

  test('handles conflict check failure gracefully', async () => {
    // Mock conflict check to fail
    (apiService.checkConflict as jest.Mock).mockRejectedValue(new Error('Conflict API Error'));

    renderWithProviders(<AbsenceTable />);

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText("Alexi Schramm")).toBeInTheDocument();
    }); 
  });
});