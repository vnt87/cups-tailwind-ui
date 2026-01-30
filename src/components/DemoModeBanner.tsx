import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useCupsConfig } from '../contexts/CupsConfigProvider'
import { useState } from 'react'

export function DemoModeBanner() {
    const { t } = useTranslation()
    const { isDemoMode } = useCupsConfig()
    const [dismissed, setDismissed] = useState(false)

    if (!isDemoMode || dismissed) {
        return null
    }

    return (
        <div className="relative flex items-center justify-center gap-4 bg-amber-50 px-4 py-2 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
            <div className="flex items-center gap-2">
                <InformationCircleIcon className="size-5 shrink-0" />
                <span>
                    {t('demo.bannerMessage')}{' '}
                    <Link to="/settings" className="font-medium underline hover:no-underline">
                        {t('demo.configureServer')}
                    </Link>
                </span>
            </div>
            <div className="absolute right-4 flex items-center">
                <button
                    onClick={() => setDismissed(true)}
                    className="shrink-0 rounded p-1 hover:bg-amber-100 dark:hover:bg-amber-800/50 transition-colors"
                    aria-label={t('common.cancel')}
                >
                    <XMarkIcon className="size-4" />
                </button>
            </div>
        </div>
    )
}
