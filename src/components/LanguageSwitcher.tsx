import { LanguageIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { changeLanguage } from '../i18n'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from './dropdown'

const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
]

export function LanguageSwitcher() {
    const { i18n } = useTranslation()
    const currentLang = i18n.language

    return (
        <Dropdown>
            <DropdownButton plain aria-label="Switch language">
                <LanguageIcon className="size-5" />
            </DropdownButton>
            <DropdownMenu anchor="bottom end">
                {languages.map((lang) => (
                    <DropdownItem key={lang.code} onClick={() => changeLanguage(lang.code)}>
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                        {currentLang === lang.code && <span className="ml-auto text-blue-500">✓</span>}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    )
}
