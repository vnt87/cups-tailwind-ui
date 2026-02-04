import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeProvider'
import { CupsConfigProvider } from './contexts/CupsConfigProvider'
import { AppLayout } from './layouts/AppLayout'
import { DashboardPage } from './pages/DashboardPage'
import { PrintersPage } from './pages/PrintersPage'
import { JobsPage } from './pages/JobsPage'
import { SettingsPage } from './pages/SettingsPage'
import { SetupPage } from './pages/SetupPage'
import { ClassesPage } from './pages/ClassesPage'
import { HelpPage } from './pages/HelpPage'
import { CupsdConfPage } from './pages/CupsdConfPage'
import './i18n'
import './index.css'

function App() {
  return (
    <ThemeProvider>
      <CupsConfigProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/setup" element={<SetupPage />} />
            <Route path="/" element={<AppLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="printers" element={<PrintersPage />} />
              <Route path="jobs" element={<JobsPage />} />
              <Route path="classes" element={<ClassesPage />} />
              <Route path="help" element={<HelpPage />} />
              <Route path="cupsd-conf" element={<CupsdConfPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CupsConfigProvider>
    </ThemeProvider>
  )
}

export default App
