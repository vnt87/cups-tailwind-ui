import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export interface CupsConfig {
    serverAddress: string
    port: string
    username: string
    password: string
}

interface CupsConfigContextType {
    config: CupsConfig
    setConfig: (config: CupsConfig) => void
    isConfigured: boolean
    isDemoMode: boolean
    setDemoMode: (value: boolean) => void
}

const defaultConfig: CupsConfig = {
    serverAddress: '',
    port: '631',
    username: '',
    password: '',
}

const CupsConfigContext = createContext<CupsConfigContextType | undefined>(undefined)

const STORAGE_KEY = 'cups-config'
const DEMO_MODE_KEY = 'cups-demo-mode'

function loadConfig(): CupsConfig {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            try {
                return JSON.parse(stored)
            } catch {
                return defaultConfig
            }
        }
    }
    return defaultConfig
}

function loadDemoMode(): boolean {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(DEMO_MODE_KEY) === 'true'
    }
    return false
}

export function CupsConfigProvider({ children }: { children: ReactNode }) {
    const [config, setConfigState] = useState<CupsConfig>(loadConfig)
    const [isDemoMode, setDemoModeState] = useState<boolean>(loadDemoMode)

    const isConfigured = Boolean(config.serverAddress && config.port)

    const setConfig = (newConfig: CupsConfig) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig))
        // If user configures a real server, exit demo mode
        if (newConfig.serverAddress) {
            localStorage.removeItem(DEMO_MODE_KEY)
            setDemoModeState(false)
        }
        setConfigState(newConfig)
    }

    const setDemoMode = (value: boolean) => {
        localStorage.setItem(DEMO_MODE_KEY, String(value))
        setDemoModeState(value)
    }

    return (
        <CupsConfigContext.Provider value={{ config, setConfig, isConfigured, isDemoMode, setDemoMode }}>
            {children}
        </CupsConfigContext.Provider>
    )
}

export function useCupsConfig() {
    const context = useContext(CupsConfigContext)
    if (context === undefined) {
        throw new Error('useCupsConfig must be used within a CupsConfigProvider')
    }
    return context
}

export function useIsFirstVisit(): boolean {
    const [isFirstVisit, setIsFirstVisit] = useState(false)

    useEffect(() => {
        const hasVisited = localStorage.getItem('cups-has-visited')
        if (!hasVisited) {
            setIsFirstVisit(true)
        }
    }, [])

    return isFirstVisit
}

export function markAsVisited() {
    localStorage.setItem('cups-has-visited', 'true')
}
