import { useTranslation } from 'react-i18next'
import { changeLanguage, getCurrentLanguage } from '../i18n'
import { NavbarItem } from './navbar'

export function SubtleLanguageSwitcher() {
    useTranslation()
    const currentLang = getCurrentLanguage()

    const toggleLanguage = () => {
        const nextLang = currentLang === 'en' ? 'vi' : 'en'
        changeLanguage(nextLang)
    }

    return (
        <NavbarItem onClick={toggleLanguage} className="cursor-pointer">
            <span className="text-xs font-medium uppercase text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                {currentLang}
            </span>
        </NavbarItem>
    )
}
