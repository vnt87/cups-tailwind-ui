import { useTranslation } from 'react-i18next'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { Heading, Subheading } from '../components/heading'
import { Text } from '../components/text'
import { Input } from '../components/input'
import { Button } from '../components/button'
import { Field, Label, Description } from '../components/fieldset'
import { Switch, SwitchField } from '../components/switch'
import { useTheme } from '../contexts/ThemeProvider'
import { changeLanguage, getCurrentLanguage } from '../i18n'
import { SunIcon, MoonIcon, ComputerDesktopIcon, ServerIcon, AdjustmentsHorizontalIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

export function SettingsPage() {
    const { t } = useTranslation()
    const { theme, setTheme } = useTheme()
    const currentLang = getCurrentLanguage()

    const tabs = [
        { name: t('settings.server'), icon: ServerIcon },
        { name: t('settings.preferences'), icon: AdjustmentsHorizontalIcon },
        { name: t('settings.system'), icon: ShieldExclamationIcon },
    ]

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <Heading>{t('settings.title')}</Heading>
                <Text className="mt-1">{t('settings.subtitle')}</Text>
            </div>

            <TabGroup className="mt-8">
                <TabList className="flex gap-4 border-b border-zinc-200 dark:border-zinc-800">
                    {tabs.map((tab) => (
                        <Tab
                            key={tab.name}
                            className={({ selected }) =>
                                clsx(
                                    'flex items-center gap-2 border-b-2 px-1 py-4 text-sm font-medium transition-all focus:outline-none',
                                    selected
                                        ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                                        : 'border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-300'
                                )
                            }
                        >
                            <tab.icon className="size-5" />
                            {tab.name}
                        </Tab>
                    ))}
                </TabList>

                <TabPanels className="mt-8">
                    {/* Server Tab */}
                    <TabPanel className="focus:outline-none">
                        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                            <div>
                                <Subheading>{t('settings.serverConnection')}</Subheading>
                                <Text className="mt-1">{t('settings.serverConnectionDesc')}</Text>
                            </div>
                            <div className="space-y-4">
                                <Field>
                                    <Label>{t('settings.serverAddress')}</Label>
                                    <Input
                                        type="text"
                                        name="server_address"
                                        placeholder="localhost"
                                        defaultValue="localhost"
                                    />
                                    <Description>{t('settings.serverAddressDesc')}</Description>
                                </Field>
                                <Field>
                                    <Label>{t('settings.port')}</Label>
                                    <Input
                                        type="number"
                                        name="port"
                                        placeholder="631"
                                        defaultValue="631"
                                    />
                                    <Description>{t('settings.portDesc')}</Description>
                                </Field>
                                <Field>
                                    <Label>{t('settings.username')}</Label>
                                    <Input
                                        type="text"
                                        name="username"
                                        placeholder="admin"
                                    />
                                </Field>
                                <Field>
                                    <Label>{t('settings.password')}</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        placeholder="••••••••"
                                    />
                                </Field>
                                <div className="flex justify-end gap-3 pt-4">
                                    <Button outline>{t('settings.testConnection')}</Button>
                                    <Button color="blue">{t('common.save')}</Button>
                                </div>
                            </div>
                        </section>
                    </TabPanel>

                    {/* Preferences Tab */}
                    <TabPanel className="focus:outline-none">
                        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                            <div>
                                <Subheading>{t('settings.preferencesSection')}</Subheading>
                                <Text className="mt-1">{t('settings.preferencesDesc')}</Text>
                            </div>
                            <div className="space-y-8">
                                <Field>
                                    <Label>{t('settings.refreshInterval')}</Label>
                                    <Input
                                        type="number"
                                        name="refresh_interval"
                                        placeholder="30"
                                        defaultValue="30"
                                    />
                                    <Description>{t('settings.refreshIntervalDesc')}</Description>
                                </Field>

                                {/* Language Toggle Group */}
                                <Field>
                                    <Label>{t('settings.language')}</Label>
                                    <Description>{t('settings.languageDesc')}</Description>
                                    <div className="mt-3 flex w-fit rounded-lg border border-zinc-200 p-1 dark:border-zinc-800">
                                        <button
                                            onClick={() => changeLanguage('en')}
                                            className={clsx(
                                                'flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all',
                                                currentLang === 'en'
                                                    ? 'bg-blue-600 text-white shadow-sm'
                                                    : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800'
                                            )}
                                        >
                                            <span>🇺🇸</span>
                                            {t('language.en')}
                                        </button>
                                        <button
                                            onClick={() => changeLanguage('vi')}
                                            className={clsx(
                                                'flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all',
                                                currentLang === 'vi'
                                                    ? 'bg-blue-600 text-white shadow-sm'
                                                    : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800'
                                            )}
                                        >
                                            <span>🇻🇳</span>
                                            {t('language.vi')}
                                        </button>
                                    </div>
                                </Field>

                                {/* Theme Toggle Group */}
                                <Field>
                                    <Label>{t('settings.darkMode')}</Label>
                                    <Description>{t('settings.darkModeDesc')}</Description>
                                    <div className="mt-3 flex w-fit rounded-lg border border-zinc-200 p-1 dark:border-zinc-800">
                                        <button
                                            onClick={() => setTheme('light')}
                                            className={clsx(
                                                'flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all',
                                                theme === 'light'
                                                    ? 'bg-blue-600 text-white shadow-sm'
                                                    : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800'
                                            )}
                                        >
                                            <SunIcon className="size-4" />
                                            {t('theme.light')}
                                        </button>
                                        <button
                                            onClick={() => setTheme('dark')}
                                            className={clsx(
                                                'flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all',
                                                theme === 'dark'
                                                    ? 'bg-blue-600 text-white shadow-sm'
                                                    : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800'
                                            )}
                                        >
                                            <MoonIcon className="size-4" />
                                            {t('theme.dark')}
                                        </button>
                                        <button
                                            onClick={() => setTheme('system')}
                                            className={clsx(
                                                'flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all',
                                                theme === 'system'
                                                    ? 'bg-blue-600 text-white shadow-sm'
                                                    : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800'
                                            )}
                                        >
                                            <ComputerDesktopIcon className="size-4" />
                                            {t('theme.system')}
                                        </button>
                                    </div>
                                </Field>

                                <SwitchField>
                                    <Label>{t('settings.jobNotifications')}</Label>
                                    <Description>{t('settings.jobNotificationsDesc')}</Description>
                                    <Switch name="notifications" />
                                </SwitchField>

                                <SwitchField>
                                    <Label>{t('settings.showCompleted')}</Label>
                                    <Description>{t('settings.showCompletedDesc')}</Description>
                                    <Switch name="show_completed" defaultChecked />
                                </SwitchField>

                                <div className="flex justify-end pt-4">
                                    <Button color="blue">{t('common.save')}</Button>
                                </div>
                            </div>
                        </section>
                    </TabPanel>

                    {/* System Tab */}
                    <TabPanel className="focus:outline-none">
                        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                            <div>
                                <Subheading>{t('settings.dangerZone')}</Subheading>
                                <Text className="mt-1">{t('settings.dangerZoneDesc')}</Text>
                            </div>
                            <div className="space-y-4">
                                <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-900/20">
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <p className="font-medium text-red-900 dark:text-red-200">{t('settings.clearAllJobs')}</p>
                                            <p className="text-sm text-red-700 dark:text-red-300">{t('settings.clearAllJobsDesc')}</p>
                                        </div>
                                        <Button color="red">{t('settings.clear')}</Button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </TabPanel>


                </TabPanels>
            </TabGroup>
        </div>
    )
}
