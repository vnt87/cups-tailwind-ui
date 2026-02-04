import { useState } from 'react'
import { PrinterIcon, QueueListIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { Heading } from '../components/heading'
import { Text } from '../components/text'
import { Badge } from '../components/badge'
import { Button } from '../components/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/table'
import { AddPrinterDialog } from '../components/AddPrinterDialog'

// Mock data for demonstration
const recentJobs = [
    { id: 1, name: 'Report_Q4_2024.pdf', printer: 'HP LaserJet Pro', status: 'completed', pages: 15, time: '2 min ago' },
    { id: 2, name: 'Invoice_001.pdf', printer: 'Canon PIXMA', status: 'printing', pages: 2, time: 'Just now' },
    { id: 3, name: 'Presentation.pptx', printer: 'HP LaserJet Pro', status: 'pending', pages: 24, time: '5 min ago' },
    { id: 4, name: 'Contract_Draft.docx', printer: 'Brother MFC', status: 'error', pages: 8, time: '10 min ago' },
]

export function DashboardPage() {
    const { t } = useTranslation()
    const [isAddPrinterOpen, setIsAddPrinterOpen] = useState(false)

    const colorStyles = {
        blue: {
            bg: 'bg-blue-100 dark:bg-blue-500/20',
            text: 'text-blue-600 dark:text-blue-400',
        },
        indigo: {
            bg: 'bg-indigo-100 dark:bg-indigo-500/20',
            text: 'text-indigo-600 dark:text-indigo-400',
        },
        green: {
            bg: 'bg-green-100 dark:bg-green-500/20',
            text: 'text-green-600 dark:text-green-400',
        },
        amber: {
            bg: 'bg-amber-100 dark:bg-amber-500/20',
            text: 'text-amber-600 dark:text-amber-400',
        },
    } as const

    const stats = [
        { name: t('dashboard.totalPrinters'), value: '4', icon: PrinterIcon, color: 'blue' },
        { name: t('dashboard.activeJobs'), value: '2', icon: QueueListIcon, color: 'indigo' },
        { name: t('dashboard.completedToday'), value: '12', icon: CheckCircleIcon, color: 'green' },
        { name: t('dashboard.issues'), value: '1', icon: ExclamationTriangleIcon, color: 'amber' },
    ] as const

    function getStatusBadge(status: string) {
        switch (status) {
            case 'completed':
                return <Badge color="green">{t('jobs.statusCompleted')}</Badge>
            case 'printing':
                return <Badge color="blue">{t('jobs.statusPrinting')}</Badge>
            case 'pending':
                return <Badge color="zinc">{t('jobs.statusPending')}</Badge>
            case 'error':
                return <Badge color="red">{t('jobs.statusError')}</Badge>
            default:
                return <Badge>{status}</Badge>
        }
    }

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <Heading>{t('dashboard.title')}</Heading>
                    <Text className="mt-1">{t('dashboard.subtitle')}</Text>
                </div>
                <Button color="blue" onClick={() => setIsAddPrinterOpen(true)}>
                    <PrinterIcon data-slot="icon" />
                    {t('dashboard.addPrinter')}
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={stat.name}
                        className="relative overflow-hidden rounded-xl border border-zinc-950/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`flex size-12 items-center justify-center rounded-lg ${colorStyles[stat.color].bg}`}>
                                <stat.icon className={`size-6 ${colorStyles[stat.color].text}`} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{stat.name}</p>
                                <p className="text-2xl font-bold text-zinc-900 dark:text-white">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Jobs Table */}
            <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
                    <Heading level={2}>{t('dashboard.recentJobs')}</Heading>
                </div>
                <Table bleed className="mx-0 [--gutter:--spacing(6)]">
                    <TableHead>
                        <TableRow>
                            <TableHeader>{t('jobs.document')}</TableHeader>
                            <TableHeader>{t('jobs.printer')}</TableHeader>
                            <TableHeader>{t('jobs.pages')}</TableHeader>
                            <TableHeader>{t('jobs.status')}</TableHeader>
                            <TableHeader>{t('jobs.submitted')}</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recentJobs.map((job) => (
                            <TableRow key={job.id}>
                                <TableCell className="font-medium">{job.name}</TableCell>
                                <TableCell>{job.printer}</TableCell>
                                <TableCell>{job.pages}</TableCell>
                                <TableCell>{getStatusBadge(job.status)}</TableCell>
                                <TableCell className="text-zinc-500">{job.time}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <AddPrinterDialog isOpen={isAddPrinterOpen} onClose={() => setIsAddPrinterOpen(false)} />
        </div>
    )
}
