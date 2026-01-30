import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from './dialog'
import { Button } from './button'
import { Input } from './input'
import { Select } from './select'
import { Field, Label, Description } from './fieldset'
import { Switch } from './switch'
import { CheckCircleIcon, SignalIcon, DocumentIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

interface AddPrinterDialogProps {
    isOpen: boolean
    onClose: () => void
}

const steps = [
    { id: 1, icon: SignalIcon },
    { id: 2, icon: DocumentIcon },
    { id: 3, icon: Cog6ToothIcon },
    { id: 4, icon: CheckCircleIcon },
]

// Mock drivers for demonstration
const drivers = [
    { id: 'hp-laserjet', name: 'HP LaserJet Series', manufacturer: 'HP' },
    { id: 'hp-deskjet', name: 'HP DeskJet Series', manufacturer: 'HP' },
    { id: 'canon-pixma', name: 'Canon PIXMA Series', manufacturer: 'Canon' },
    { id: 'brother-laser', name: 'Brother Laser Printers', manufacturer: 'Brother' },
    { id: 'epson-workforce', name: 'Epson WorkForce Series', manufacturer: 'Epson' },
    { id: 'generic-postscript', name: 'Generic PostScript Printer', manufacturer: 'Generic' },
    { id: 'generic-pcl', name: 'Generic PCL Printer', manufacturer: 'Generic' },
]

export function AddPrinterDialog({ isOpen, onClose }: AddPrinterDialogProps) {
    const { t } = useTranslation()
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({
        uri: '',
        driver: '',
        name: '',
        location: '',
        description: '',
        isDefault: false,
        shareOnNetwork: false,
    })

    const handleNext = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handleFinish = () => {
        // TODO: Submit to CUPS API
        console.log('Adding printer:', formData)
        onClose()
        setCurrentStep(1)
        setFormData({
            uri: '',
            driver: '',
            name: '',
            location: '',
            description: '',
            isDefault: false,
            shareOnNetwork: false,
        })
    }

    const handleClose = () => {
        onClose()
        setCurrentStep(1)
    }

    const getStepTitle = (step: number) => {
        switch (step) {
            case 1: return t('addPrinter.step1Title')
            case 2: return t('addPrinter.step2Title')
            case 3: return t('addPrinter.step3Title')
            case 4: return t('addPrinter.step4Title')
            default: return ''
        }
    }

    const getStepDesc = (step: number) => {
        switch (step) {
            case 1: return t('addPrinter.step1Desc')
            case 2: return t('addPrinter.step2Desc')
            case 3: return t('addPrinter.step3Desc')
            case 4: return t('addPrinter.step4Desc')
            default: return ''
        }
    }

    return (
        <Dialog open={isOpen} onClose={handleClose} size="2xl">
            <DialogTitle>{t('addPrinter.title')}</DialogTitle>
            <DialogDescription>
                <span className="font-medium text-zinc-900 dark:text-white">{getStepTitle(currentStep)}</span>
                {' — '}
                {getStepDesc(currentStep)}
            </DialogDescription>

            {/* Steps indicator */}
            <div className="mt-4 flex items-center justify-center gap-2">
                {steps.map((step) => (
                    <div key={step.id} className="flex items-center">
                        <div
                            className={clsx(
                                'flex size-10 items-center justify-center rounded-full border-2 transition-colors',
                                currentStep === step.id
                                    ? 'border-blue-500 bg-blue-500 text-white'
                                    : currentStep > step.id
                                        ? 'border-green-500 bg-green-500 text-white'
                                        : 'border-zinc-300 text-zinc-400 dark:border-zinc-600'
                            )}
                        >
                            {currentStep > step.id ? (
                                <CheckCircleIcon className="size-5" />
                            ) : (
                                <step.icon className="size-5" />
                            )}
                        </div>
                        {step.id < 4 && (
                            <div
                                className={clsx(
                                    'h-0.5 w-8',
                                    currentStep > step.id ? 'bg-green-500' : 'bg-zinc-200 dark:bg-zinc-700'
                                )}
                            />
                        )}
                    </div>
                ))}
            </div>

            <DialogBody>
                {/* Step 1: Connection */}
                {currentStep === 1 && (
                    <div className="space-y-4">
                        <Field>
                            <Label>{t('addPrinter.printerUri')}</Label>
                            <Input
                                type="text"
                                placeholder={t('addPrinter.printerUriPlaceholder')}
                                value={formData.uri}
                                onChange={(e) => setFormData({ ...formData, uri: e.target.value })}
                            />
                            <Description>
                                Examples: ipp://printer.local:631/ipp/print, lpd://192.168.1.100/queue, socket://192.168.1.100:9100
                            </Description>
                        </Field>
                        <div className="flex justify-center pt-4">
                            <Button outline>
                                <SignalIcon className="size-4" />
                                {t('addPrinter.discoverPrinters')}
                            </Button>
                        </div>
                    </div>
                )}

                {/* Step 2: Driver */}
                {currentStep === 2 && (
                    <div className="space-y-4">
                        <Field>
                            <Label>{t('addPrinter.selectDriver')}</Label>
                            <Select
                                value={formData.driver}
                                onChange={(e) => setFormData({ ...formData, driver: e.target.value })}
                            >
                                <option value="">-- Select a driver --</option>
                                {drivers.map((driver) => (
                                    <option key={driver.id} value={driver.id}>
                                        {driver.manufacturer} - {driver.name}
                                    </option>
                                ))}
                            </Select>
                        </Field>
                    </div>
                )}

                {/* Step 3: Details */}
                {currentStep === 3 && (
                    <div className="space-y-4">
                        <Field>
                            <Label>{t('addPrinter.printerName')}</Label>
                            <Input
                                type="text"
                                placeholder="My Printer"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </Field>
                        <Field>
                            <Label>{t('addPrinter.printerLocation')}</Label>
                            <Input
                                type="text"
                                placeholder="Office - 2nd Floor"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            />
                        </Field>
                        <Field>
                            <Label>{t('addPrinter.printerDescription')}</Label>
                            <Input
                                type="text"
                                placeholder="Color laser printer"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </Field>
                        <div className="flex items-center justify-between pt-2">
                            <Label>{t('addPrinter.setAsDefault')}</Label>
                            <Switch
                                checked={formData.isDefault}
                                onChange={(checked) => setFormData({ ...formData, isDefault: checked })}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label>{t('addPrinter.shareOnNetwork')}</Label>
                            <Switch
                                checked={formData.shareOnNetwork}
                                onChange={(checked) => setFormData({ ...formData, shareOnNetwork: checked })}
                            />
                        </div>
                    </div>
                )}

                {/* Step 4: Confirm */}
                {currentStep === 4 && (
                    <div className="space-y-4">
                        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800">
                            <dl className="space-y-3">
                                <div className="flex justify-between">
                                    <dt className="text-sm text-zinc-500 dark:text-zinc-400">{t('addPrinter.printerUri')}</dt>
                                    <dd className="text-sm font-medium text-zinc-900 dark:text-white">{formData.uri || '—'}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-sm text-zinc-500 dark:text-zinc-400">Driver</dt>
                                    <dd className="text-sm font-medium text-zinc-900 dark:text-white">
                                        {drivers.find(d => d.id === formData.driver)?.name || '—'}
                                    </dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-sm text-zinc-500 dark:text-zinc-400">{t('addPrinter.printerName')}</dt>
                                    <dd className="text-sm font-medium text-zinc-900 dark:text-white">{formData.name || '—'}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-sm text-zinc-500 dark:text-zinc-400">{t('addPrinter.printerLocation')}</dt>
                                    <dd className="text-sm font-medium text-zinc-900 dark:text-white">{formData.location || '—'}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-sm text-zinc-500 dark:text-zinc-400">{t('addPrinter.setAsDefault')}</dt>
                                    <dd className="text-sm font-medium text-zinc-900 dark:text-white">{formData.isDefault ? 'Yes' : 'No'}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-sm text-zinc-500 dark:text-zinc-400">{t('addPrinter.shareOnNetwork')}</dt>
                                    <dd className="text-sm font-medium text-zinc-900 dark:text-white">{formData.shareOnNetwork ? 'Yes' : 'No'}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                )}
            </DialogBody>

            <DialogActions>
                <Button plain onClick={handleClose}>
                    {t('common.cancel')}
                </Button>
                <div className="flex gap-3">
                    {currentStep > 1 && (
                        <Button outline onClick={handlePrevious}>
                            {t('addPrinter.previous')}
                        </Button>
                    )}
                    {currentStep < 4 ? (
                        <Button color="blue" onClick={handleNext}>
                            {t('addPrinter.next')}
                        </Button>
                    ) : (
                        <Button color="blue" onClick={handleFinish}>
                            {t('addPrinter.finish')}
                        </Button>
                    )}
                </div>
            </DialogActions>
        </Dialog>
    )
}
