import type React from 'react'
import './App.css'
import AbsenceTable from './components/AbsenceTable'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SortProvider } from './context/SortContext';

const queryClient: QueryClient = new QueryClient();

const App: React.FC = () => {


  return (
    <QueryClientProvider client={queryClient}>
      <SortProvider>
      <div>
        <header>
          <h1>BrightHR Absence Tracker</h1>
        </header>
        <main>
          <AbsenceTable />
        </main>
        <footer>
          <p>© 2024 BrightHR</p>
        </footer>
      </div>
      </SortProvider>
    </QueryClientProvider>
  )
}

export default App
