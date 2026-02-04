import { CupsdConfEditor } from '../components/CupsdConfEditor'
import { Heading } from '../components/heading'
import { Text } from '../components/text'

export function CupsdConfPage() {
    return (
        <div className="space-y-8">
            <div>
                <Heading>Server Configuration</Heading>
                <Text className="mt-1">Edit the cupsd.conf configuration file directly.</Text>
            </div>

            <CupsdConfEditor />
        </div>
    )
}
