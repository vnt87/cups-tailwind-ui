import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline'
import { useTheme } from '../contexts/ThemeProvider'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from './dropdown'

export function ThemeSwitcher() {
    const { theme, setTheme, resolvedTheme } = useTheme()

    const CurrentIcon = resolvedTheme === 'dark' ? MoonIcon : SunIcon

    return (
        <Dropdown>
            <DropdownButton plain aria-label="Switch theme">
                <CurrentIcon className="size-5" />
            </DropdownButton>
            <DropdownMenu anchor="bottom end">
                <DropdownItem onClick={() => setTheme('light')}>
                    <SunIcon className="size-4" />
                    <span>Light</span>
                    {theme === 'light' && <span className="ml-auto text-blue-500">✓</span>}
                </DropdownItem>
                <DropdownItem onClick={() => setTheme('dark')}>
                    <MoonIcon className="size-4" />
                    <span>Dark</span>
                    {theme === 'dark' && <span className="ml-auto text-blue-500">✓</span>}
                </DropdownItem>
                <DropdownItem onClick={() => setTheme('system')}>
                    <ComputerDesktopIcon className="size-4" />
                    <span>System</span>
                    {theme === 'system' && <span className="ml-auto text-blue-500">✓</span>}
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}
