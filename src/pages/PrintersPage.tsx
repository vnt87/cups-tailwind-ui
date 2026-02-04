import { useState } from 'react'
import { PrinterIcon, PlusIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { Heading } from '../components/heading'
import { Text } from '../components/text'
import { Badge } from '../components/badge'
import { Button } from '../components/button'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '../components/dropdown'
import { AddPrinterDialog } from '../components/AddPrinterDialog'

// Mock data for demonstration
const printers = [
    {
        id: 1,
        name: 'HP LaserJet Pro MFP M428fdw',
        location: 'Office - 2nd Floor',
        status: 'idle',
        type: 'Laser',
        connection: 'Network',
        jobs: 0,
        isDefault: true,
    },
    {
        id: 2,
        name: 'Canon PIXMA TR8620',
        location: 'Home Office',
        status: 'printing',
        type: 'Inkjet',
        connection: 'USB',
        jobs: 2,
        isDefault: false,
    },
    {
        id: 3,
        name: 'Brother MFC-L2750DW',
        location: 'Office - 1st Floor',
        status: 'idle',
        type: 'Laser',
        connection: 'Network',
        jobs: 0,
        isDefault: false,
    },
    {
        id: 4,
        name: 'Epson WorkForce Pro WF-4830',
        location: 'Reception',
        status: 'error',
        type: 'Inkjet',
        connection: 'Network',
        jobs: 1,
        isDefault: false,
    },
]

export function PrintersPage() {
    const { t } = useTranslation()
    const [isAddPrinterOpen, setIsAddPrinterOpen] = useState(false)

    function getStatusBadge(status: string) {
        switch (status) {
            case 'idle':
                return <Badge color="green">{t('printers.statusIdle')}</Badge>
            case 'printing':
                return <Badge color="blue">{t('printers.statusPrinting')}</Badge>
            case 'error':
                return <Badge color="red">{t('printers.statusError')}</Badge>
            default:
                return <Badge>{status}</Badge>
        }
    }

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <Heading>{t('printers.title')}</Heading>
                    <Text className="mt-1">{t('printers.subtitle')}</Text>
                </div>
                <Button color="blue" onClick={() => setIsAddPrinterOpen(true)}>
                    <PlusIcon data-slot="icon" />
                    {t('printers.addPrinter')}
                </Button>
            </div>

            {/* Printers Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {printers.map((printer) => (
                    <div
                        key={printer.id}
                        className="relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                                <div className="flex size-12 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                                    <PrinterIcon className="size-6 text-zinc-600 dark:text-zinc-400" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-zinc-900 dark:text-white">{printer.name}</h3>
                                        {printer.isDefault && (
                                            <Badge color="indigo">{t('printers.default')}</Badge>
                                        )}
                                    </div>
                                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{printer.location}</p>
                                </div>
                            </div>
                            <Dropdown>
                                <DropdownButton plain aria-label="More options">
                                    <EllipsisHorizontalIcon className="size-5" />
                                </DropdownButton>
                                <DropdownMenu anchor="bottom end">
                                    <DropdownItem>{t('printers.setAsDefault')}</DropdownItem>
                                    <DropdownItem>{t('printers.printTestPage')}</DropdownItem>
                                    <DropdownItem>{t('printers.viewQueue')}</DropdownItem>
                                    <DropdownItem>{t('printers.properties')}</DropdownItem>
                                    <DropdownItem>{t('printers.remove')}</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>

                        <div className="mt-6 grid grid-cols-4 gap-4 border-t border-zinc-200 pt-4 dark:border-zinc-800">
                            <div>
                                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{t('printers.status')}</p>
                                <div className="mt-1">
                                    {getStatusBadge(printer.status)}
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{t('printers.type')}</p>
                                <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-white">{printer.type}</p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{t('printers.connection')}</p>
                                <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-white">{printer.connection}</p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{t('printers.jobs')}</p>
                                <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-white">{printer.jobs}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <AddPrinterDialog isOpen={isAddPrinterOpen} onClose={() => setIsAddPrinterOpen(false)} />
        </div>
    )
}
