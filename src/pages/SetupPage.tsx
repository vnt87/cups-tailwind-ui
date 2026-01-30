import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PrinterIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { Heading, Subheading } from '../components/heading'
import { Text } from '../components/text'
import { Input } from '../components/input'
import { Button } from '../components/button'
import { Field, Label, Description } from '../components/fieldset'
import { useCupsConfig, markAsVisited } from '../contexts/CupsConfigProvider'

export function SetupPage() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { setConfig, setDemoMode } = useCupsConfig()

    const [serverAddress, setServerAddress] = useState('')
    const [port, setPort] = useState('631')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleConnect = () => {
        setConfig({ serverAddress, port, username, password })
        markAsVisited()
        navigate('/')
    }

    const handleSkip = () => {
        setDemoMode(true)
        markAsVisited()
        navigate('/')
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 dark:bg-zinc-950">
            <div className="w-full max-w-md space-y-8">
                {/* Logo and Title */}
                <div className="text-center">
                    <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                        <PrinterIcon className="size-8 text-white" />
                    </div>
                    <Heading className="mt-6">{t('setup.title')}</Heading>
                    <Text className="mt-2">{t('setup.subtitle')}</Text>
                </div>

                {/* Setup Form */}
                <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <Subheading>{t('setup.connectionDetails')}</Subheading>
                    <Text className="mt-1 text-sm">{t('setup.connectionDetailsDesc')}</Text>

                    <div className="mt-6 space-y-4">
                        <Field>
                            <Label>{t('settings.serverAddress')}</Label>
                            <Input
                                type="text"
                                name="server_address"
                                placeholder="localhost"
                                value={serverAddress}
                                onChange={(e) => setServerAddress(e.target.value)}
                            />
                            <Description>{t('settings.serverAddressDesc')}</Description>
                        </Field>
                        <Field>
                            <Label>{t('settings.port')}</Label>
                            <Input
                                type="number"
                                name="port"
                                placeholder="631"
                                value={port}
                                onChange={(e) => setPort(e.target.value)}
                            />
                            <Description>{t('settings.portDesc')}</Description>
                        </Field>
                        <Field>
                            <Label>{t('settings.username')}</Label>
                            <Input
                                type="text"
                                name="username"
                                placeholder="admin"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Field>
                        <Field>
                            <Label>{t('settings.password')}</Label>
                            <Input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Field>
                    </div>

                    <div className="mt-8 space-y-3">
                        <Button color="blue" className="w-full" onClick={handleConnect}>
                            {t('setup.connect')}
                            <ArrowRightIcon className="ml-2 size-4" />
                        </Button>
                        <button
                            onClick={handleSkip}
                            className="w-full text-center text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
                        >
                            {t('setup.skipForNow')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
