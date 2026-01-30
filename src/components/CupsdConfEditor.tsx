import { useState, useMemo, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from './text'
import { Input } from './input'
import { Button } from './button'
import { Field, Label, Description } from './fieldset'
import { Switch, SwitchField } from './switch'
import {
    InformationCircleIcon,
    DocumentArrowDownIcon,
    ClipboardDocumentIcon,
    ArrowPathIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    EyeIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'

// Types
interface LocationConfig {
    allow: string
    order: 'allow,deny' | 'deny,allow'
    authType?: 'Default' | 'Basic' | 'Digest' | 'Negotiate' | ''
    requireUser?: string
}

interface LimitConfig {
    operations: string
    authType?: 'Default' | 'Basic' | 'Digest' | 'Negotiate' | ''
    requireUser?: string
    order: 'allow,deny' | 'deny,allow'
}

interface PolicyConfig {
    jobPrivateAccess: string
    jobPrivateValues: string
    subscriptionPrivateAccess: string
    subscriptionPrivateValues: string
    limits: LimitConfig[]
}

interface CupsdConfig {
    // Server Settings
    logLevel: 'warn' | 'debug' | 'debug2' | 'info' | 'notice' | 'error'
    pageLogFormat: string
    maxLogSize: number
    port: number
    listenAddresses: string[]
    // Browsing
    browsing: boolean
    browseLocalProtocols: 'dnssd' | 'cups' | 'all'
    // Authentication
    defaultAuthType: 'Basic' | 'Digest' | 'Negotiate'
    webInterface: boolean
    // Locations
    locations: {
        root: LocationConfig
        admin: LocationConfig
        adminConf: LocationConfig
        adminLog: LocationConfig
    }
    // Policies
    policies: {
        default: PolicyConfig
        authenticated: PolicyConfig
        kerberos: PolicyConfig
    }
}

// Default configuration
const getDefaultConfig = (): CupsdConfig => ({
    logLevel: 'warn',
    pageLogFormat: '',
    maxLogSize: 0,
    port: 631,
    listenAddresses: ['/run/cups/cups.sock'],
    browsing: true,
    browseLocalProtocols: 'dnssd',
    defaultAuthType: 'Basic',
    webInterface: true,
    locations: {
        root: { allow: 'all', order: 'allow,deny' },
        admin: { allow: 'all', order: 'allow,deny' },
        adminConf: { allow: '', order: 'allow,deny', authType: 'Default', requireUser: '@SYSTEM' },
        adminLog: { allow: '', order: 'allow,deny', authType: 'Default', requireUser: '@SYSTEM' },
    },
    policies: {
        default: {
            jobPrivateAccess: 'default',
            jobPrivateValues: 'default',
            subscriptionPrivateAccess: 'default',
            subscriptionPrivateValues: 'default',
            limits: [
                { operations: 'Create-Job Print-Job Print-URI Validate-Job', order: 'deny,allow' },
                { operations: 'Send-Document Send-URI Hold-Job Release-Job Restart-Job Purge-Jobs Set-Job-Attributes Create-Job-Subscription Renew-Subscription Cancel-Subscription Get-Notifications Reprocess-Job Cancel-Current-Job Suspend-Current-Job Resume-Job Cancel-My-Jobs Close-Job CUPS-Move-Job CUPS-Get-Document', requireUser: '@OWNER @SYSTEM', order: 'deny,allow' },
                { operations: 'CUPS-Add-Modify-Printer CUPS-Delete-Printer CUPS-Add-Modify-Class CUPS-Delete-Class CUPS-Set-Default CUPS-Get-Devices', authType: 'Default', requireUser: '@SYSTEM', order: 'deny,allow' },
                { operations: 'Pause-Printer Resume-Printer Enable-Printer Disable-Printer Pause-Printer-After-Current-Job Hold-New-Jobs Release-Held-New-Jobs Deactivate-Printer Activate-Printer Restart-Printer Shutdown-Printer Startup-Printer Promote-Job Schedule-Job-After Cancel-Jobs CUPS-Accept-Jobs CUPS-Reject-Jobs', authType: 'Default', requireUser: '@SYSTEM', order: 'deny,allow' },
                { operations: 'Cancel-Job CUPS-Authenticate-Job', requireUser: '@OWNER @SYSTEM', order: 'deny,allow' },
                { operations: 'All', order: 'deny,allow' },
            ],
        },
        authenticated: {
            jobPrivateAccess: 'default',
            jobPrivateValues: 'default',
            subscriptionPrivateAccess: 'default',
            subscriptionPrivateValues: 'default',
            limits: [
                { operations: 'Create-Job Print-Job Print-URI Validate-Job', authType: 'Default', order: 'deny,allow' },
                { operations: 'Send-Document Send-URI Hold-Job Release-Job Restart-Job Purge-Jobs Set-Job-Attributes Create-Job-Subscription Renew-Subscription Cancel-Subscription Get-Notifications Reprocess-Job Cancel-Current-Job Suspend-Current-Job Resume-Job Cancel-My-Jobs Close-Job CUPS-Move-Job CUPS-Get-Document', authType: 'Default', requireUser: '@OWNER @SYSTEM', order: 'deny,allow' },
                { operations: 'CUPS-Add-Modify-Printer CUPS-Delete-Printer CUPS-Add-Modify-Class CUPS-Delete-Class CUPS-Set-Default', authType: 'Default', requireUser: '@SYSTEM', order: 'deny,allow' },
                { operations: 'Pause-Printer Resume-Printer Enable-Printer Disable-Printer Pause-Printer-After-Current-Job Hold-New-Jobs Release-Held-New-Jobs Deactivate-Printer Activate-Printer Restart-Printer Shutdown-Printer Startup-Printer Promote-Job Schedule-Job-After Cancel-Jobs CUPS-Accept-Jobs CUPS-Reject-Jobs', authType: 'Default', requireUser: '@SYSTEM', order: 'deny,allow' },
                { operations: 'Cancel-Job CUPS-Authenticate-Job', authType: 'Default', requireUser: '@OWNER @SYSTEM', order: 'deny,allow' },
                { operations: 'All', order: 'deny,allow' },
            ],
        },
        kerberos: {
            jobPrivateAccess: 'default',
            jobPrivateValues: 'default',
            subscriptionPrivateAccess: 'default',
            subscriptionPrivateValues: 'default',
            limits: [
                { operations: 'Create-Job Print-Job Print-URI Validate-Job', authType: 'Negotiate', order: 'deny,allow' },
                { operations: 'Send-Document Send-URI Hold-Job Release-Job Restart-Job Purge-Jobs Set-Job-Attributes Create-Job-Subscription Renew-Subscription Cancel-Subscription Get-Notifications Reprocess-Job Cancel-Current-Job Suspend-Current-Job Resume-Job Cancel-My-Jobs Close-Job CUPS-Move-Job CUPS-Get-Document', authType: 'Negotiate', requireUser: '@OWNER @SYSTEM', order: 'deny,allow' },
                { operations: 'CUPS-Add-Modify-Printer CUPS-Delete-Printer CUPS-Add-Modify-Class CUPS-Delete-Class CUPS-Set-Default', authType: 'Default', requireUser: '@SYSTEM', order: 'deny,allow' },
                { operations: 'Pause-Printer Resume-Printer Enable-Printer Disable-Printer Pause-Printer-After-Current-Job Hold-New-Jobs Release-Held-New-Jobs Deactivate-Printer Activate-Printer Restart-Printer Shutdown-Printer Startup-Printer Promote-Job Schedule-Job-After Cancel-Jobs CUPS-Accept-Jobs CUPS-Reject-Jobs', authType: 'Default', requireUser: '@SYSTEM', order: 'deny,allow' },
                { operations: 'Cancel-Job CUPS-Authenticate-Job', authType: 'Negotiate', requireUser: '@OWNER @SYSTEM', order: 'deny,allow' },
                { operations: 'All', order: 'deny,allow' },
            ],
        },
    },
})

// Toggle Button Group Component
function ToggleButtonGroup<T extends string>({
    options,
    value,
    onChange,
    size = 'md',
}: {
    options: { value: T; label: string }[]
    value: T
    onChange: (value: T) => void
    size?: 'sm' | 'md'
}) {
    return (
        <div className="flex flex-wrap rounded-lg border border-zinc-200 p-1 dark:border-zinc-700">
            {options.map((option) => (
                <button
                    key={option.value}
                    type="button"
                    onClick={() => onChange(option.value)}
                    className={clsx(
                        'rounded-md font-medium transition-all',
                        size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm',
                        value === option.value
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800'
                    )}
                >
                    {option.label}
                </button>
            ))}
        </div>
    )
}

// Section Header Component
function SectionHeader({
    title,
    description,
    isOpen,
    onToggle,
}: {
    title: string
    description?: string
    isOpen: boolean
    onToggle: () => void
}) {
    return (
        <button
            type="button"
            onClick={onToggle}
            className="flex w-full items-start gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-left transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800/50 dark:hover:bg-zinc-800"
        >
            <div className="mt-0.5 text-zinc-400">
                {isOpen ? <ChevronDownIcon className="size-5" /> : <ChevronRightIcon className="size-5" />}
            </div>
            <div className="flex-1">
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
                {description && (
                    <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">{description}</p>
                )}
            </div>
        </button>
    )
}

// Collapsible Section Component
function CollapsibleSection({
    title,
    description,
    children,
    defaultOpen = false,
}: {
    title: string
    description?: string
    children: React.ReactNode
    defaultOpen?: boolean
}) {
    const [isOpen, setIsOpen] = useState(defaultOpen)

    return (
        <div className="space-y-3">
            <SectionHeader
                title={title}
                description={description}
                isOpen={isOpen}
                onToggle={() => setIsOpen(!isOpen)}
            />
            {isOpen && (
                <div className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
                    {children}
                </div>
            )}
        </div>
    )
}

// Syntax Highlighted Config Preview
function ConfigPreview({ content, onCopy, copySuccess }: { content: string; onCopy: () => void; copySuccess: boolean }) {
    const { t } = useTranslation()

    const highlightLine = (line: string): React.ReactNode => {
        // Comments
        if (line.trim().startsWith('#')) {
            return <span className="text-zinc-500 dark:text-zinc-500">{line}</span>
        }
        // Section tags like <Location />, <Policy>, <Limit>
        if (line.trim().startsWith('<') && line.trim().endsWith('>')) {
            const match = line.match(/^(\s*)(<\/?)([\w/]+)(.*)?(>)$/)
            if (match) {
                return (
                    <>
                        <span>{match[1]}</span>
                        <span className="text-pink-600 dark:text-pink-400">{match[2]}</span>
                        <span className="text-blue-600 font-semibold dark:text-blue-400">{match[3]}</span>
                        <span className="text-emerald-600 dark:text-emerald-400">{match[4] || ''}</span>
                        <span className="text-pink-600 dark:text-pink-400">{match[5]}</span>
                    </>
                )
            }
        }
        // Directive lines (e.g., LogLevel warn)
        const directiveMatch = line.match(/^(\s*)([\w-]+)(\s+)(.*)$/)
        if (directiveMatch) {
            return (
                <>
                    <span>{directiveMatch[1]}</span>
                    <span className="text-purple-600 font-medium dark:text-purple-400">{directiveMatch[2]}</span>
                    <span>{directiveMatch[3]}</span>
                    <span className="text-amber-600 dark:text-amber-400">{directiveMatch[4]}</span>
                </>
            )
        }
        return line
    }

    const lines = content.split('\n')

    return (
        <div className="space-y-3">
            <div className="overflow-auto rounded-lg border border-zinc-200 bg-zinc-950 dark:border-zinc-700">
                <pre className="p-4 font-mono text-xs leading-relaxed">
                    <code>
                        {lines.map((line, idx) => (
                            <div key={idx} className="flex">
                                <span className="mr-4 inline-block w-8 select-none text-right text-zinc-600">
                                    {idx + 1}
                                </span>
                                <span className="text-zinc-300">{highlightLine(line)}</span>
                            </div>
                        ))}
                    </code>
                </pre>
            </div>
            <div className="flex justify-end">
                <Button outline onClick={onCopy}>
                    <ClipboardDocumentIcon className="size-4" />
                    {copySuccess ? t('cupsdEditor.copied') : t('cupsdEditor.copy')}
                </Button>
            </div>
        </div>
    )
}

// Location Section Component
function LocationSection({
    title,
    location,
    onUpdate,
    showAuth = false,
}: {
    title: string
    location: LocationConfig
    onUpdate: (field: keyof LocationConfig, value: string) => void
    showAuth?: boolean
}) {
    const { t } = useTranslation()

    return (
        <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
            <h4 className="mb-3 font-medium text-zinc-900 dark:text-zinc-100">{title}</h4>
            <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                    <Label>{t('cupsdEditor.allow')}</Label>
                    <Input
                        value={location.allow}
                        onChange={(e) => onUpdate('allow', e.target.value)}
                        placeholder="all"
                    />
                </Field>
                <Field>
                    <Label>{t('cupsdEditor.order')}</Label>
                    <ToggleButtonGroup
                        options={[
                            { value: 'allow,deny', label: 'allow,deny' },
                            { value: 'deny,allow', label: 'deny,allow' },
                        ]}
                        value={location.order}
                        onChange={(v) => onUpdate('order', v)}
                        size="sm"
                    />
                </Field>
                {showAuth && (
                    <>
                        <Field>
                            <Label>{t('cupsdEditor.authType')}</Label>
                            <ToggleButtonGroup
                                options={[
                                    { value: '', label: 'None' },
                                    { value: 'Default', label: 'Default' },
                                    { value: 'Basic', label: 'Basic' },
                                    { value: 'Digest', label: 'Digest' },
                                    { value: 'Negotiate', label: 'Negotiate' },
                                ]}
                                value={location.authType || ''}
                                onChange={(v) => onUpdate('authType', v)}
                                size="sm"
                            />
                        </Field>
                        <Field>
                            <Label>{t('cupsdEditor.requireUser')}</Label>
                            <Input
                                value={location.requireUser || ''}
                                onChange={(e) => onUpdate('requireUser', e.target.value)}
                                placeholder="@SYSTEM"
                            />
                        </Field>
                    </>
                )}
            </div>
        </div>
    )
}

export function CupsdConfEditor() {
    const { t } = useTranslation()
    const [config, setConfig] = useState<CupsdConfig>(getDefaultConfig())
    const [copySuccess, setCopySuccess] = useState(false)
    const previewRef = useRef<HTMLDivElement>(null)

    // Generate config file content
    const generateConfig = useCallback((cfg: CupsdConfig): string => {
        const lines: string[] = []

        // Header
        lines.push('#')
        lines.push('# Configuration file for the CUPS scheduler.  See "man cupsd.conf" for a')
        lines.push('# complete description of this file.')
        lines.push('#')
        lines.push('')

        // Log settings
        lines.push('# Log general information in error_log - change "warn" to "debug"')
        lines.push('# for troubleshooting...')
        lines.push(`LogLevel ${cfg.logLevel}`)
        lines.push(`PageLogFormat${cfg.pageLogFormat ? ' ' + cfg.pageLogFormat : ''}`)
        lines.push('')
        lines.push("# Deactivate CUPS' internal logrotating, as we provide a better one, especially")
        lines.push('# LogLevel debug2 gets usable now')
        lines.push(`MaxLogSize ${cfg.maxLogSize}`)
        lines.push('')

        // Network settings
        lines.push('# Only listen for connections from the local machine.')
        lines.push(`Port ${cfg.port}`)
        cfg.listenAddresses.forEach(addr => {
            lines.push(`Listen ${addr}`)
        })
        lines.push('')

        // Browsing
        lines.push('# Show shared printers on the local network.')
        lines.push(`Browsing ${cfg.browsing ? 'On' : 'Off'}`)
        lines.push(`BrowseLocalProtocols ${cfg.browseLocalProtocols}`)
        lines.push('')

        // Authentication
        lines.push('# Default authentication type, when authentication is required...')
        lines.push(`DefaultAuthType ${cfg.defaultAuthType}`)
        lines.push('')
        lines.push('# Web interface setting...')
        lines.push(`WebInterface ${cfg.webInterface ? 'Yes' : 'No'}`)
        lines.push('')

        // Location blocks
        const generateLocation = (path: string, loc: LocationConfig, comment: string) => {
            lines.push(`# ${comment}`)
            lines.push(`<Location ${path}>`)
            if (loc.authType) lines.push(`  AuthType ${loc.authType}`)
            if (loc.requireUser) lines.push(`  Require user ${loc.requireUser}`)
            if (loc.allow) lines.push(`  Allow ${loc.allow}`)
            lines.push(`  Order ${loc.order}`)
            lines.push('</Location>')
            lines.push('')
        }

        generateLocation('/', cfg.locations.root, 'Restrict access to the server...')
        generateLocation('/admin', cfg.locations.admin, 'Restrict access to the admin pages...')
        generateLocation('/admin/conf', cfg.locations.adminConf, 'Restrict access to configuration files...')
        generateLocation('/admin/log', cfg.locations.adminLog, 'Restrict access to log files...')

        // Policy blocks
        const generatePolicy = (name: string, policy: PolicyConfig, comment: string) => {
            lines.push(`# ${comment}`)
            lines.push(`<Policy ${name}>`)
            lines.push('  # Job/subscription privacy...')
            lines.push(`  JobPrivateAccess ${policy.jobPrivateAccess}`)
            lines.push(`  JobPrivateValues ${policy.jobPrivateValues}`)
            lines.push(`  SubscriptionPrivateAccess ${policy.subscriptionPrivateAccess}`)
            lines.push(`  SubscriptionPrivateValues ${policy.subscriptionPrivateValues}`)
            lines.push('')

            policy.limits.forEach((limit, idx) => {
                const comments = [
                    '# Job-related operations must be done by the owner or an administrator...',
                    '',
                    '# All administration operations require an administrator to authenticate...',
                    '# All printer operations require a printer operator to authenticate...',
                    '# Only the owner or an administrator can cancel or authenticate a job...',
                    '',
                ]
                if (comments[idx]) lines.push(`  ${comments[idx]}`)
                lines.push(`  <Limit ${limit.operations}>`)
                if (limit.authType) lines.push(`    AuthType ${limit.authType}`)
                if (limit.requireUser) lines.push(`    Require user ${limit.requireUser}`)
                lines.push(`    Order ${limit.order}`)
                lines.push('  </Limit>')
                lines.push('')
            })

            lines.push('</Policy>')
            lines.push('')
        }

        generatePolicy('default', cfg.policies.default, 'Set the default printer/job policies...')
        generatePolicy('authenticated', cfg.policies.authenticated, 'Set the authenticated printer/job policies...')
        generatePolicy('kerberos', cfg.policies.kerberos, 'Set the kerberized printer/job policies...')

        return lines.join('\n')
    }, [])

    const configContent = useMemo(() => generateConfig(config), [config, generateConfig])

    const handleExport = () => {
        const blob = new Blob([configContent], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'cupsd.conf'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(configContent)
            setCopySuccess(true)
            setTimeout(() => setCopySuccess(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    const handleReset = () => {
        setConfig(getDefaultConfig())
    }

    const scrollToPreview = () => {
        previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    const updateConfig = <K extends keyof CupsdConfig>(key: K, value: CupsdConfig[K]) => {
        setConfig(prev => ({ ...prev, [key]: value }))
    }

    const updateLocation = (loc: keyof CupsdConfig['locations'], field: keyof LocationConfig, value: string) => {
        setConfig(prev => ({
            ...prev,
            locations: {
                ...prev.locations,
                [loc]: { ...prev.locations[loc], [field]: value },
            },
        }))
    }

    return (
        <div className="pb-24">
            {/* Info Banner */}
            <div className="mb-8 flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-900/20">
                <InformationCircleIcon className="mt-0.5 size-5 shrink-0 text-blue-600 dark:text-blue-400" />
                <div>
                    <p className="font-medium text-blue-900 dark:text-blue-200">
                        {t('cupsdEditor.infoTitle')}
                    </p>
                    <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                        {t('cupsdEditor.infoDescription')}
                    </p>
                    <code className="mt-2 inline-block rounded bg-blue-100 px-2 py-1 font-mono text-xs text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
                        /etc/cups/cupsd.conf
                    </code>
                </div>
            </div>

            <div className="space-y-6">
                {/* Server Settings */}
                <CollapsibleSection
                    title={t('cupsdEditor.serverSettings')}
                    description={t('cupsdEditor.serverSettingsDesc')}
                    defaultOpen={true}
                >
                    <div className="grid gap-6 lg:grid-cols-2">
                        <Field>
                            <Label>{t('cupsdEditor.logLevel')}</Label>
                            <Description className="mb-2">{t('cupsdEditor.logLevelDesc')}</Description>
                            <ToggleButtonGroup
                                options={[
                                    { value: 'error', label: 'error' },
                                    { value: 'warn', label: 'warn' },
                                    { value: 'notice', label: 'notice' },
                                    { value: 'info', label: 'info' },
                                    { value: 'debug', label: 'debug' },
                                    { value: 'debug2', label: 'debug2' },
                                ]}
                                value={config.logLevel}
                                onChange={(v) => updateConfig('logLevel', v as CupsdConfig['logLevel'])}
                            />
                        </Field>

                        <Field>
                            <Label>{t('cupsdEditor.maxLogSize')}</Label>
                            <Description className="mb-2">{t('cupsdEditor.maxLogSizeDesc')}</Description>
                            <Input
                                type="number"
                                value={config.maxLogSize}
                                onChange={(e) => updateConfig('maxLogSize', parseInt(e.target.value) || 0)}
                            />
                        </Field>

                        <Field>
                            <Label>{t('cupsdEditor.port')}</Label>
                            <Description className="mb-2">{t('cupsdEditor.portDesc')}</Description>
                            <Input
                                type="number"
                                value={config.port}
                                onChange={(e) => updateConfig('port', parseInt(e.target.value) || 631)}
                            />
                        </Field>

                        <Field>
                            <Label>{t('cupsdEditor.listenAddress')}</Label>
                            <Description className="mb-2">{t('cupsdEditor.listenAddressDesc')}</Description>
                            <Input
                                type="text"
                                value={config.listenAddresses.join(', ')}
                                onChange={(e) => updateConfig('listenAddresses', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                            />
                        </Field>
                    </div>
                </CollapsibleSection>

                {/* Browsing & Authentication - Combined in 2 columns */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Browsing Settings */}
                    <CollapsibleSection
                        title={t('cupsdEditor.browsingSettings')}
                        description={t('cupsdEditor.browsingSettingsDesc')}
                        defaultOpen={true}
                    >
                        <div className="space-y-5">
                            <SwitchField>
                                <Label>{t('cupsdEditor.browsing')}</Label>
                                <Description>{t('cupsdEditor.browsingDesc')}</Description>
                                <Switch
                                    checked={config.browsing}
                                    onChange={(val) => updateConfig('browsing', val)}
                                />
                            </SwitchField>

                            <Field>
                                <Label>{t('cupsdEditor.browseProtocols')}</Label>
                                <Description className="mb-2">{t('cupsdEditor.browseProtocolsDesc')}</Description>
                                <ToggleButtonGroup
                                    options={[
                                        { value: 'dnssd', label: 'dnssd' },
                                        { value: 'cups', label: 'cups' },
                                        { value: 'all', label: 'all' },
                                    ]}
                                    value={config.browseLocalProtocols}
                                    onChange={(v) => updateConfig('browseLocalProtocols', v as CupsdConfig['browseLocalProtocols'])}
                                />
                            </Field>
                        </div>
                    </CollapsibleSection>

                    {/* Authentication Settings */}
                    <CollapsibleSection
                        title={t('cupsdEditor.authSettings')}
                        description={t('cupsdEditor.authSettingsDesc')}
                        defaultOpen={true}
                    >
                        <div className="space-y-5">
                            <Field>
                                <Label>{t('cupsdEditor.defaultAuthType')}</Label>
                                <Description className="mb-2">{t('cupsdEditor.defaultAuthTypeDesc')}</Description>
                                <ToggleButtonGroup
                                    options={[
                                        { value: 'Basic', label: 'Basic' },
                                        { value: 'Digest', label: 'Digest' },
                                        { value: 'Negotiate', label: 'Negotiate' },
                                    ]}
                                    value={config.defaultAuthType}
                                    onChange={(v) => updateConfig('defaultAuthType', v as CupsdConfig['defaultAuthType'])}
                                />
                            </Field>

                            <SwitchField>
                                <Label>{t('cupsdEditor.webInterface')}</Label>
                                <Description>{t('cupsdEditor.webInterfaceDesc')}</Description>
                                <Switch
                                    checked={config.webInterface}
                                    onChange={(val) => updateConfig('webInterface', val)}
                                />
                            </SwitchField>
                        </div>
                    </CollapsibleSection>
                </div>

                {/* Location Blocks */}
                <CollapsibleSection
                    title={t('cupsdEditor.locationBlocks')}
                    description={t('cupsdEditor.locationBlocksDesc')}
                >
                    <div className="grid gap-4 lg:grid-cols-2">
                        <LocationSection
                            title={t('cupsdEditor.locationRoot')}
                            location={config.locations.root}
                            onUpdate={(field, value) => updateLocation('root', field, value)}
                        />
                        <LocationSection
                            title={t('cupsdEditor.locationAdmin')}
                            location={config.locations.admin}
                            onUpdate={(field, value) => updateLocation('admin', field, value)}
                        />
                        <LocationSection
                            title={t('cupsdEditor.locationAdminConf')}
                            location={config.locations.adminConf}
                            onUpdate={(field, value) => updateLocation('adminConf', field, value)}
                            showAuth
                        />
                        <LocationSection
                            title={t('cupsdEditor.locationAdminLog')}
                            location={config.locations.adminLog}
                            onUpdate={(field, value) => updateLocation('adminLog', field, value)}
                            showAuth
                        />
                    </div>
                </CollapsibleSection>

                {/* Policy Information */}
                <CollapsibleSection
                    title={t('cupsdEditor.policyBlocks')}
                    description={t('cupsdEditor.policyBlocksDesc')}
                >
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-900/20">
                        <Text className="text-sm text-amber-800 dark:text-amber-200">
                            {t('cupsdEditor.policyNote')}
                        </Text>
                    </div>
                </CollapsibleSection>

                {/* Preview */}
                <div ref={previewRef} className="scroll-mt-4">
                    <CollapsibleSection
                        title={t('cupsdEditor.preview')}
                        description={t('cupsdEditor.previewDesc')}
                        defaultOpen={true}
                    >
                        <ConfigPreview content={configContent} onCopy={handleCopy} copySuccess={copySuccess} />
                    </CollapsibleSection>
                </div>
            </div>

            {/* Floating Action Bar */}
            <div className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200 bg-white/95 backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/95">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                    <Button outline onClick={scrollToPreview}>
                        <EyeIcon className="size-4" />
                        {t('cupsdEditor.preview')}
                    </Button>
                    <div className="flex items-center gap-3">
                        <Button outline onClick={handleReset}>
                            <ArrowPathIcon className="size-4" />
                            {t('cupsdEditor.reset')}
                        </Button>
                        <Button color="blue" onClick={handleExport}>
                            <DocumentArrowDownIcon className="size-4" />
                            {t('cupsdEditor.export')}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
