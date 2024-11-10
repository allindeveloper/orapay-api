import { steps } from "./whatsapp.const";

export const initialStep = (to: string, name: string) => {
    return {
        messaging_product: 'whatsapp',
        to,
        type: 'interactive',
        interactive: {
            type: 'list',
            header: { type: 'text', text: `Hello dear ${name}` },
            body: {
                text: `Welcome to Orapay service, your chatbot financial agent. Run secured financial errands through *WhatsApp* once you open an account. \n\nPlease select one of the options below.`
            },
            footer: { text: 'Powered by Orapay' },
            action: {
                button: 'Choose an option',
                sections: [
                    {
                        title: 'Services',
                        rows: [
                            { id: steps.OPEN.OPEN, title: '[1] Open Account', description: 'Create a new account' },
                            { id: '2', title: '[2] Transfer', description: 'Send money to someone' },
                            { id: '3', title: '[3] Beneficiaries', description: 'Manage beneficiaries' },
                            { id: '4', title: '[4] Customer Support', description: 'Get assistance' }
                        ]
                    }
                ]
            }
        }
    }
};

export const buttonMessage = (to: string, supportPhoneNumber: string) => ({
    messaging_product: 'whatsapp',
    to,
    type: 'interactive',
    interactive: {
        type: "cta_url",
        body: {
            text: `Thank you for contacting Orapay agent! \nHow may we assist you today?`
        },
        action: {
            name: "cta_url",
            parameters: {
                display_text: "Contact Support Team",
                url: `tel:${supportPhoneNumber}`
            }
        }
    }
});

export const openMessageStep = (to: string, name: string) => ({
    messaging_product: 'whatsapp',
    to,
    type: 'interactive',
    interactive: {
        type: 'list',
        body: {
            text: `Send us your details below and select done to proceed, \nNickname:\nEmail:\nState:`
        },
        footer: { text: 'Powered by Orapay' },
        action: {
            button: 'Choose an option',
            sections: [
                {
                    title: 'Open',
                    rows: [
                        { id: steps.OPEN.OPEN_DONE, title: '[5] Done' },
                        { id: steps.OPEN.OPEN_CANCEL, title: '[6] Cancel' },
                    ]
                }
            ]
        }
    },
})

export const cancelMessageStep = (to: string) => ({
    messaging_product: 'whatsapp',
    to,
    type: 'text',
    text: {
        body: `Thank you for contacting Orapay agent! \nDo have a great day!`,
    },
    footer: { text: 'Powered by Orapay' },
})


export const doneActionOpenAccountStep = (to: string) => ({
    messaging_product: 'whatsapp',
    to,
    type: 'interactive',
    interactive: {
        type: 'list',
        body: {
            text: `Congratulations you are set. Verify this account using preferred verification options.`
        },
        footer: { text: 'Powered by Orapay' },
        action: {
            button: 'Choose an option',
            sections: [
                {
                    title: 'Done',
                    rows: [
                        { id: steps.OPEN.DONE.PHONE, title: '[7] Phone' },
                        { id: steps.OPEN.DONE.EMAIL, title: '[8] Email' },
                    ]
                }
            ]
        }
    },
})

export const donePhoneEmailActionStep = (to: string) => ({
    messaging_product: 'whatsapp',
    to,
    type: 'interactive',
    interactive: {
        type: 'list',
        body: {
            text: `Welldone a code has been sent to your phone. \nProvide the code and confirm to complete process.`
        },
        footer: { text: 'Powered by Orapay' },
        action: {
            button: 'Choose an option',
            sections: [
                {
                    title: 'Phone or Email',
                    rows: [
                        { id: steps.OPEN.DONE.OPEN_CONFIRMED, title: '[9] Confirmed' },
                        { id: steps.OPEN.DONE.OPEN_DID_NOT_SEE_CODE, title: '[10] Didn’t see the code' },
                    ]
                }
            ]
        }
    },
})
// PHONE OR EMAIL 

// 

// Code:

// [9] Confirmed
// [10] Didn’t see the code