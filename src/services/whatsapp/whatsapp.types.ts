export type WhatsAppMessagePayload = {
    text?: {
        body: string
    },
    from: string
    contacts: {
        profile?: {
            name?: string
        }
    }[]
}

export type WhatsAppBody = {
    entry: {
        changes: {
            value: {
                messages: WhatsAppMessagePayload[]
            }
        }[]
    }[]
}