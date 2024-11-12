import { footerText, steps } from "./whatsapp.const";

export const initialStep = (to: string, name: string) => {
    return {
        messaging_product: 'whatsapp',
        to,
        type: 'interactive',
        interactive: {
            type: 'list',
            body: {
                text: `Hello dear ${name} \nWelcome to Orapay service, your  agency banking chatbot. Run secured financial errands through *WhatsApp voice notes* once you open an account. \n\nPlease select one of the options below.`
            },
            footer: { text: footerText },
            action: {
                button: 'Choose an option',
                sections: [
                    {
                        title: 'Services',
                        rows: [
                            { id: steps.OPEN.OPEN, title: '[1] Open Account', description: 'Create a new account' },
                            { id: steps.TRANSFER.TRANSFER, title: '[2] Transfer', description: 'Send money to someone' },
                            { id: steps.BENEFICIARIES.BENEFICIARIES, title: '[3] Beneficiaries', description: 'Manage beneficiaries' },
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
            text: `Thank you for contacting Orapay service! \nClick below to speak with a customer support agent.`
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
            text: `Send us your details and select done to proceed from the options below, \nNickname:\nEmail:\nState of residence:`
        },
        footer: { text: footerText },
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
        body: `Thank you for contacting Orapay service! \nDo have a great day!`,
    },
    footer: { text: footerText },
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
        footer: { text: footerText },
        action: {
            button: 'Choose an option',
            sections: [
                {
                    title: 'Done',
                    rows: [
                        { id: steps.OPEN.DONE.DONE_OPEN_PHONE, title: '[7] Phone' },
                        { id: steps.OPEN.DONE.DONE_OPEN_EMAIL, title: '[8] Email' },
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
            text: `Welldone a code has been sent to your phone. \nPlease type the code and confirm to complete process.`
        },
        footer: { text: footerText },
        action: {
            button: 'Choose an option',
            sections: [
                {
                    title: 'Confirmation',
                    rows: [
                        { id: steps.OPEN.DONE.DONE_OPEN_CONFIRMED, title: '[9] Confirmed' },
                        { id: steps.OPEN.DONE.DONE_OPEN_DID_NOT_SEE_CODE, title: '[10] Didn’t see the code' },
                    ]
                }
            ]
        }
    },
});

export const confirmedActionStep = (to: string) => ({
    messaging_product: 'whatsapp',
    to,
    type: 'interactive',
    interactive: {
        type: 'list',
        body: {
            text: `Create your security question and answer for your transaction password using this format. \nWhat is the name of my dog : Peggy`
        },
        footer: { text: footerText },
        action: {
            button: 'Security Question',
            sections: [
                {
                    title: 'Security Question',
                    rows: [
                        { id: steps.OPEN.DONE.DONE_OPEN_CONFIRMED_PROCEED, title: '[11] Select to proceed' },
                        { id: steps.OPEN.DONE.DONE_OPEN_NO_CODE_2FA, title: '[12] Add 2FA password' },
                    ]
                }
            ]
        }
    },
});

export const didNotSeeCodeActionStep = (to: string) => ({
    messaging_product: 'whatsapp',
    to,
    type: 'text',
    text: {
        body: `Sorry wait a minute`,
    },
    footer: { text: footerText },
});


export const proceedActionStep = (to: string) => ({
    messaging_product: 'whatsapp',
    to,
    type: 'interactive',
    interactive: {
        type: 'list',
        body: {
            text: `While your transaction is processing you may now *take note of password and delete on WhatsApp* send 13 to begin`
        },
        footer: { text: footerText },
        action: {
            button: 'Click to Begin',
            sections: [
                {
                    title: 'Begin',
                    rows: [
                        { id: steps.OPEN.DONE.DONE_OPEN_BEGIN, title: '[13] Begin' },]
                }
            ]
        }
    },
});

export const welcomeOnboardMessageStep = (to: string) => ({
    messaging_product: 'whatsapp',
    to,
    type: 'interactive',
    interactive: {
        type: 'list',
        body: {
            text: `BEGIN \nWelcome onboard. \nFund your wallet through Messageframe to begin the use of voice-notes for subsequent transactions :-`
        },
        footer: { text: footerText },
        action: {
            button: 'Choose an option',
            sections: [
                {
                    title: 'Fund Wallet',
                    rows: [
                        { id: steps.OPEN.DONE.DONE_OPEN_FUND_WALLET, title: '[ok] Fund wallet' },]
                }
            ]
        }
    },
});

export const fundWalletMessageStep = (to: string) => ({
    messaging_product: 'whatsapp',
    to,
    type: 'text',
    text: {
        body: `FUND \n\nFund wallet and send receipt afterwards \n\nBank name *:Moniepoint* \nCopy account *:Number*`,
    },
    footer: { text: footerText },
});


export const transferMessageStep = (to: string) => ({
    messaging_product: 'whatsapp',
    to,
    type: 'interactive',
    interactive: {
        type: 'list',
        body: {
            text: `Send your command using voice note or chat. \nProvide below details and click proceed
            \nE.g Destination Bank:, Destination Account:, Amount: and Password`
        },
        footer: { text: footerText },
        action: {
            button: 'Select option',
            sections: [
                {
                    title: 'Transfer',
                    rows: [
                        { id: steps.TRANSFER.TRANSFER_PROCEED, title: '[P] Proceed' },
                    ]
                }
            ]
        }
    },
});

export const processingRequestMessageStep = (to: string, message?: string) => ({
    messaging_product: 'whatsapp',
    to,
    type: 'text',
    text: {
        body: message || `Processing your request...`,
    },
    footer: { text: footerText },
});

export const beneficiariesMessageStep = (to: string) => ({
    messaging_product: 'whatsapp',
    to,
    type: 'interactive',
    interactive: {
        type: 'list',
        body: {
            text: `Create your list of beneficiaries. \nAll names and must be unique.`
        },
        footer: { text: footerText },
        action: {
            button: 'Select option',
            sections: [
                {
                    title: 'Beneficiaries',
                    rows: [
                        { id: steps.BENEFICIARIES.BENEFICIARIES_CREATE, title: '[14] Add beneficiaries' },
                        { id: steps.BENEFICIARIES.BENEFICIARIES_EDIT, title: '[15] Edit beneficiaries' },
                    ]
                }
            ]
        }
    },
});


export const beneficiariesAddMessageStep = (to: string) => ({
    messaging_product: 'whatsapp',
    to,
    type: 'interactive',
    interactive: {
        type: 'list',
        body: {
            text: `ADD BENEFICIARIES \n\nSend names acct. & bank name followed by + _ to create list \nE.g\n\nKevin Bayem, 0000000000, Orapay`
        },
        footer: { text: footerText },
        action: {
            button: 'Select option',
            sections: [
                {
                    title: 'Proceed',
                    rows: [
                        { id: steps.BENEFICIARIES.BENEFICIARIES_CREATE_PROCEED, title: '[+] Create list' },
                    ]
                }
            ]
        }
    },
});

export const beneficiariesEditMessageStep = (to: string) => ({
    messaging_product: 'whatsapp',
    to,
    type: 'interactive',
    interactive: {
        type: 'list',
        body: {
            text: `EDIT \n\nEdit and send names acct. & bank name followed by + sign _ to update list \nE.g\n\nKevin Bayem, 0000000000, Orapay`
        },
        footer: { text: footerText },
        action: {
            button: 'Select option',
            sections: [
                {
                    title: 'Proceed',
                    rows: [
                        { id: steps.BENEFICIARIES.BENEFICIARIES_EDIT_PROCEED, title: '[+] Edit and Proceed' },
                    ]
                }
            ]
        }
    },
});