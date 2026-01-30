import {
    PrinterIcon,
    QueueListIcon,
    Cog6ToothIcon,
    HomeIcon,
} from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { Sidebar, SidebarBody, SidebarFooter, SidebarHeader, SidebarItem, SidebarLabel, SidebarSection, SidebarSpacer } from '../components/sidebar'
import { SidebarLayout } from '../components/sidebar-layout'
import { Navbar, NavbarSpacer } from '../components/navbar'
import { Outlet, useLocation } from 'react-router-dom'

export function AppLayout() {
    const location = useLocation()
    const { t } = useTranslation()

    const navigation = [
        { name: t('nav.dashboard'), href: '/', icon: HomeIcon },
        { name: t('nav.printers'), href: '/printers', icon: PrinterIcon },
        { name: t('nav.jobs'), href: '/jobs', icon: QueueListIcon },
        { name: t('nav.settings'), href: '/settings', icon: Cog6ToothIcon },
    ]

    return (
        <SidebarLayout
            navbar={
                <Navbar>
                    <NavbarSpacer />
                </Navbar>
            }
            sidebar={
                <Sidebar>
                    <SidebarHeader>
                        <div className="flex items-center gap-3 px-2">
                            <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                                <PrinterIcon className="size-6 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-zinc-900 dark:text-white">{t('common.appName')}</p>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">{t('common.appDescription')}</p>
                            </div>
                        </div>
                    </SidebarHeader>
                    <SidebarBody>
                        <SidebarSection>
                            {navigation.map((item) => (
                                <SidebarItem
                                    key={item.href}
                                    href={item.href}
                                    current={location.pathname === item.href}
                                >
                                    <item.icon data-slot="icon" />
                                    <SidebarLabel>{item.name}</SidebarLabel>
                                </SidebarItem>
                            ))}
                        </SidebarSection>
                        <SidebarSpacer />
                    </SidebarBody>
                    <SidebarFooter>
                        <div className="flex items-center justify-between px-2 py-2">
                            <p className="text-xs text-zinc-400 dark:text-zinc-500">
                                {t('common.appName')} {t('common.version')}
                            </p>
                        </div>
                    </SidebarFooter>
                </Sidebar>
            }
        >
            <Outlet />
        </SidebarLayout>
    )
}
