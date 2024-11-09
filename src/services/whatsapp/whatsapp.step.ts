export const initialStep = (to: string, name: string) => {
    return {
        messaging_product: 'whatsapp',
        to,
        type: 'interactive',
        interactive: {
            type: 'list',
            header: { type: 'text', text: `Hello dear ${name}` },
            body: {
                text: `Welcome to Orapay service, your chatbot financial agent. Run secured financial errands through *WhatsApp* once you open an account. \n\n Please select one of the options below.`
            },
            footer: { text: 'Powered by OraPay' },
            action: {
                button: 'Choose an option',
                sections: [
                    {
                        title: 'Services',
                        rows: [
                            { id: '1', title: 'Open Account', description: 'Create a new account' },
                            { id: '2', title: 'Transfer', description: 'Send money to someone' },
                            { id: '3', title: 'Beneficiaries', description: 'Manage beneficiaries' },
                            { id: '4', title: 'Customer Support', description: 'Get assistance' }
                        ]
                    }
                ]
            }
        }
    }
};