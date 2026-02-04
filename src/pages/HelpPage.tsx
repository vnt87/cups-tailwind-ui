import { Heading } from '../components/heading'
import { Text } from '../components/text'
import { BookOpenIcon, } from '@heroicons/react/24/outline'

const helpResources = [
    {
        title: 'Command-Line Printer Administration',
        description: 'Learn how to configure and manage destinations with CUPS from the command line.',
        href: 'https://www.cups.org/doc/admin.html',
    },
    {
        title: 'Encryption Support',
        description: 'Information about encryption support in CUPS.',
        href: 'https://www.cups.org/doc/encryption.html',
    },
    {
        title: 'CGI Reference',
        description: 'Reference for CGI programs used in CUPS.',
        href: 'https://www.cups.org/doc/cgi.html',
    },
    {
        title: 'Web Interface Administration',
        description: 'Guide to using the CUPS web administration interface.',
        href: 'https://www.cups.org/doc/web-ui.html',
    }
]

export function HelpPage() {
    return (
        <div className="space-y-8">
            <div>
                <Heading>Help & Documentation</Heading>
                <Text className="mt-1">
                    Resources and guides for managing your printing system.
                </Text>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {helpResources.map((resource) => (
                    <a
                        key={resource.title}
                        href={resource.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex flex-col items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                    >
                        <div className="flex size-10 flex-none items-center justify-center rounded-lg bg-zinc-100 group-hover:bg-zinc-200 dark:bg-zinc-800 dark:group-hover:bg-zinc-700">
                            <BookOpenIcon className="size-6 text-zinc-600 dark:text-zinc-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-zinc-900 dark:text-white">
                                {resource.title}
                            </h3>
                            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                                {resource.description}
                            </p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}
