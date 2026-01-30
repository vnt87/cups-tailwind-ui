import { DocumentIcon, FunnelIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { Heading } from '../components/heading'
import { Text } from '../components/text'
import { Badge } from '../components/badge'
import { Button } from '../components/button'
import { Input, InputGroup } from '../components/input'
import { Select } from '../components/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/table'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '../components/dropdown'

// Mock data for demonstration
const jobs = [
    {
        id: 'J-001',
        name: 'Annual_Report_2024.pdf',
        printer: 'HP LaserJet Pro MFP M428fdw',
        user: 'john.doe',
        pages: 45,
        copies: 1,
        status: 'completed',
        submitted: '2024-01-30 10:45:00',
    },
    {
        id: 'J-002',
        name: 'Invoice_Bundle_January.pdf',
        printer: 'Canon PIXMA TR8620',
        user: 'jane.smith',
        pages: 12,
        copies: 2,
        status: 'printing',
        submitted: '2024-01-30 10:50:00',
    },
    {
        id: 'J-003',
        name: 'Marketing_Presentation.pptx',
        printer: 'HP LaserJet Pro MFP M428fdw',
        user: 'john.doe',
        pages: 24,
        copies: 5,
        status: 'pending',
        submitted: '2024-01-30 10:52:00',
    },
    {
        id: 'J-004',
        name: 'Contract_Draft_v2.docx',
        printer: 'Brother MFC-L2750DW',
        user: 'admin',
        pages: 8,
        copies: 1,
        status: 'held',
        submitted: '2024-01-30 09:30:00',
    },
    {
        id: 'J-005',
        name: 'Photo_Album_Birthday.jpg',
        printer: 'Epson WorkForce Pro WF-4830',
        user: 'jane.smith',
        pages: 1,
        copies: 10,
        status: 'error',
        submitted: '2024-01-30 08:15:00',
    },
]

export function JobsPage() {
    const { t } = useTranslation()

    function getStatusBadge(status: string) {
        switch (status) {
            case 'completed':
                return <Badge color="green">{t('jobs.statusCompleted')}</Badge>
            case 'printing':
                return <Badge color="blue">{t('jobs.statusPrinting')}</Badge>
            case 'pending':
                return <Badge color="zinc">{t('jobs.statusPending')}</Badge>
            case 'held':
                return <Badge color="amber">{t('jobs.statusHeld')}</Badge>
            case 'error':
                return <Badge color="red">{t('jobs.statusError')}</Badge>
            case 'cancelled':
                return <Badge color="zinc">{t('jobs.statusCancelled')}</Badge>
            default:
                return <Badge>{status}</Badge>
        }
    }

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <Heading>{t('jobs.title')}</Heading>
                    <Text className="mt-1">{t('jobs.subtitle')}</Text>
                </div>
                <div className="flex gap-3">
                    <Button outline>
                        <FunnelIcon data-slot="icon" />
                        {t('common.filter')}
                    </Button>
                    <Button color="red">
                        <XMarkIcon data-slot="icon" />
                        {t('jobs.cancelAll')}
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:flex-row sm:items-center">
                <div className="flex-1">
                    <InputGroup>
                        <MagnifyingGlassIcon data-slot="icon" />
                        <Input
                            type="search"
                            placeholder={t('jobs.searchPlaceholder')}
                            aria-label={t('jobs.searchPlaceholder')}
                        />
                    </InputGroup>
                </div>
                <div className="flex gap-3">
                    <Select name="printer" defaultValue="">
                        <option value="">{t('jobs.allPrinters')}</option>
                        <option value="hp">HP LaserJet Pro</option>
                        <option value="canon">Canon PIXMA</option>
                        <option value="brother">Brother MFC</option>
                        <option value="epson">Epson WorkForce</option>
                    </Select>
                    <Select name="status" defaultValue="">
                        <option value="">{t('jobs.allStatus')}</option>
                        <option value="pending">{t('jobs.statusPending')}</option>
                        <option value="printing">{t('jobs.statusPrinting')}</option>
                        <option value="completed">{t('jobs.statusCompleted')}</option>
                        <option value="error">{t('jobs.statusError')}</option>
                    </Select>
                </div>
            </div>

            {/* Jobs Table */}
            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                <Table bleed className="mx-0 [--gutter:--spacing(6)]">
                    <TableHead>
                        <TableRow>
                            <TableHeader>{t('jobs.jobId')}</TableHeader>
                            <TableHeader>{t('jobs.document')}</TableHeader>
                            <TableHeader>{t('jobs.printer')}</TableHeader>
                            <TableHeader>{t('jobs.user')}</TableHeader>
                            <TableHeader>{t('jobs.pages')}</TableHeader>
                            <TableHeader>{t('jobs.status')}</TableHeader>
                            <TableHeader>{t('jobs.submitted')}</TableHeader>
                            <TableHeader className="w-0">
                                <span className="sr-only">{t('common.actions')}</span>
                            </TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {jobs.map((job) => (
                            <TableRow key={job.id}>
                                <TableCell className="font-mono text-sm">{job.id}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <DocumentIcon className="size-4 text-zinc-400" />
                                        <span className="font-medium">{job.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-sm">{job.printer}</TableCell>
                                <TableCell className="text-sm">{job.user}</TableCell>
                                <TableCell className="text-sm">
                                    {job.pages} × {job.copies}
                                </TableCell>
                                <TableCell>{getStatusBadge(job.status)}</TableCell>
                                <TableCell className="text-sm text-zinc-500">{job.submitted}</TableCell>
                                <TableCell>
                                    <Dropdown>
                                        <DropdownButton plain aria-label="More options">
                                            •••
                                        </DropdownButton>
                                        <DropdownMenu anchor="bottom end">
                                            {job.status === 'pending' && <DropdownItem>{t('jobs.hold')}</DropdownItem>}
                                            {job.status === 'held' && <DropdownItem>{t('jobs.release')}</DropdownItem>}
                                            {job.status === 'error' && <DropdownItem>{t('jobs.retry')}</DropdownItem>}
                                            {job.status !== 'completed' && job.status !== 'cancelled' && (
                                                <DropdownItem>{t('jobs.cancel')}</DropdownItem>
                                            )}
                                            <DropdownItem>{t('jobs.viewDetails')}</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
