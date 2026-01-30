import {
    PrinterIcon,
    QueueListIcon,
    Cog6ToothIcon,
    HomeIcon,
} from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { Sidebar, SidebarBody, SidebarSection, SidebarItem, SidebarLabel } from '../components/sidebar'
import { StackedLayout } from '../components/stacked-layout'
import { Navbar, NavbarSection, NavbarItem, NavbarDivider, NavbarSpacer } from '../components/navbar'
import { SubtleLanguageSwitcher } from '../components/SubtleLanguageSwitcher'
import { SubtleThemeSwitcher } from '../components/SubtleThemeSwitcher'
import { DemoModeBanner } from '../components/DemoModeBanner'
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
        <>
            <DemoModeBanner />
            <StackedLayout
                navbar={
                    <Navbar>
                        {/* Logo / Brand */}
                        <div className="flex items-center gap-2">
                            <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
                                <PrinterIcon className="size-5 text-white" />
                            </div>
                            <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                                {t('common.appName')}
                            </span>
                        </div>
                        <NavbarDivider className="max-lg:hidden" />
                        {/* Navigation Items */}
                        <NavbarSection className="max-lg:hidden">
                            {navigation.map((item) => (
                                <NavbarItem
                                    key={item.href}
                                    href={item.href}
                                    current={location.pathname === item.href}
                                >
                                    {item.name}
                                </NavbarItem>
                            ))}
                        </NavbarSection>
                        <NavbarSpacer />
                        {/* Right side - switchers and version */}
                        <NavbarSection className="flex items-center gap-1">
                            <SubtleLanguageSwitcher />
                            <SubtleThemeSwitcher />
                            <p className="text-xs text-zinc-400 dark:text-zinc-500 max-sm:hidden ml-2">
                                {t('common.version')}
                            </p>
                        </NavbarSection>
                    </Navbar>
                }
                sidebar={
                    <Sidebar>
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
                        </SidebarBody>
                    </Sidebar>
                }
            >
                <Outlet />
            </StackedLayout>
        </>
    )
}
