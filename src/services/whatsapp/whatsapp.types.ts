export type WhatsAppMessagePayload = {
    text?: {
        body: string
    },
    from: string
    contact: {
        profile?: {
            name?: string
        }
    }
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