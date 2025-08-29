import type React from 'react'
import './App.css'
import AbsenceTable from './components/AbsenceTable'

const App: React.FC = () => {

  return (
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
  )
}

export default App
