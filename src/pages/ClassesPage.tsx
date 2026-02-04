
import {
    PlusIcon,
    EllipsisHorizontalIcon,
    Square2StackIcon,
} from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { Heading } from '../components/heading'
import { Text } from '../components/text'
import { Badge } from '../components/badge'
import { Button } from '../components/button'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '../components/dropdown'

// Mock data for classes
const classes = [
    {
        id: 1,
        name: 'Office_Printers',
        members: ['HP LaserJet Pro MFP M428fdw', 'Brother MFC-L2750DW'],
        status: 'idle',
        jobs: 0,
        isShared: true,
    },
    {
        id: 2,
        name: 'Color_Printers',
        members: ['Canon PIXMA TR8620', 'Epson WorkForce Pro WF-4830'],
        status: 'idle',
        jobs: 2,
        isShared: false,
    },
]

export function ClassesPage() {
    const { t } = useTranslation()
    // You might want to add a specific dialog for adding classes later
    // const [isAddClassOpen, setIsAddClassOpen] = useState(false)

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
                    <Heading>Classes</Heading>
                    <Text className="mt-1">Manage printer classes (pools).</Text>
                </div>
                <Button color="blue">
                    <PlusIcon data-slot="icon" />
                    Add Class
                </Button>
            </div>

            {/* Classes Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {classes.map((cls) => (
                    <div
                        key={cls.id}
                        className="relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                                <div className="flex size-12 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                                    <Square2StackIcon className="size-6 text-zinc-600 dark:text-zinc-400" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-zinc-900 dark:text-white">{cls.name}</h3>
                                        {cls.isShared && (
                                            <Badge color="blue">Shared</Badge>
                                        )}
                                    </div>
                                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                        {cls.members.join(', ')}
                                    </p>
                                </div>
                            </div>
                            <Dropdown>
                                <DropdownButton plain aria-label="More options">
                                    <EllipsisHorizontalIcon className="size-5" />
                                </DropdownButton>
                                <DropdownMenu anchor="bottom end">
                                    <DropdownItem>Modify Class</DropdownItem>
                                    <DropdownItem>Print Test Page</DropdownItem>
                                    <DropdownItem>Delete Class</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-zinc-200 pt-4 dark:border-zinc-800">
                            <div>
                                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{t('printers.status')}</p>
                                <div className="mt-1">
                                    {getStatusBadge(cls.status)}
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{t('printers.jobs')}</p>
                                <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-white">{cls.jobs}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Class Dialog Placeholder */}
            {/* <AddClassDialog isOpen={isAddClassOpen} onClose={() => setIsAddClassOpen(false)} /> */}
        </div>
    )
}
