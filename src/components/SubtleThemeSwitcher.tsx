import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { useTheme } from '../contexts/ThemeProvider'
import { NavbarItem } from './navbar'

export function SubtleThemeSwitcher() {
    const { setTheme, resolvedTheme } = useTheme()

    const toggleTheme = () => {
        // Simple toggle between light and dark, bypassing 'system' for simplicity as requested (click to change)
        const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
        setTheme(nextTheme)
    }

    const Icon = resolvedTheme === 'dark' ? MoonIcon : SunIcon

    return (
        <NavbarItem onClick={toggleTheme} className="cursor-pointer">
            <Icon className="size-4 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors" />
        </NavbarItem>
    )
}
