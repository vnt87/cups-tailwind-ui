import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeProvider'
import { CupsConfigProvider } from './contexts/CupsConfigProvider'
import { AppLayout } from './layouts/AppLayout'
import { DashboardPage } from './pages/DashboardPage'
import { PrintersPage } from './pages/PrintersPage'
import { JobsPage } from './pages/JobsPage'
import { SettingsPage } from './pages/SettingsPage'
import { SetupPage } from './pages/SetupPage'
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
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CupsConfigProvider>
    </ThemeProvider>
  )
}

export default App
