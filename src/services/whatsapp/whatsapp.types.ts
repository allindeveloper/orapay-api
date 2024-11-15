export enum MessageType {
    TEXT = "text",
    INTERACTIVE = "interactive"
}

export type WhatsAppMessageInteractive = {
    type: 'list_reply',
    list_reply: {
        id: string,
        title: string,
        description?: string,
    }
}

export type WhatsAppContact = {
    profile?: {
        name?: string
    }
}

export type WhatsAppMessagePayload = {
    text?: {
        body: string
    },
    type: MessageType;
    interactive?: WhatsAppMessageInteractive
    from: string
    contacts: WhatsAppContact[]
}

export type WhatsAppBody = {
    entry: {
        changes: {
            value: {
                messages: WhatsAppMessagePayload[]
                contacts: WhatsAppContact[]
            }
        }[]
    }[]
}