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
            footer: { text: 'Powered by OraPay' },
            action: {
                button: 'Choose an option',
                sections: [
                    {
                        title: 'Services',
                        rows: [
                            { id: '1', title: '[1] Open Account', description: 'Create a new account' },
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

export const buttonMessage = (to: string) => ({
    messaging_product: 'whatsapp',
    to,
    type: 'interactive',
    interactive: {
        type: 'button',
        body: {
            text: `Thank you for contacting Orapay agent! \nHow may we assist you today?`
        },
        action: {
            buttons: [
                {
                    type: 'phone_number',
                    phone_number: '+2347034367931',
                    text: 'Speak to Support Team'
                }
            ]
        }
    }
})