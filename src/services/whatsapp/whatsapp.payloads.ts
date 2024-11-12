import { footerText, steps } from "./whatsapp.const";

export const initialStep = (to: string, name: string) => {
    return {
        messaging_product: 'whatsapp',
        to,
        type: 'interactive',
        interactive: {
            type: 'list',
            body: {
                text: `_Hello dear_ ${name} \n_Welcome to Orapay service, your  agency banking chatbot. Run secured financial errands through *WhatsApp voice notes* once you open an account._ \n\n_Please select one of the options below._`
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
            text: `_Thank you for contacting Orapay service! \nClick below to speak with a customer support agent._`
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
            text: `OPEN \n\n_Send us your details and select done to proceed from the options below,_ \nNickname:\nEmail:\nState of residence:`
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
            text: `DONE \n\n_Congratulations you are set. Verify this account using preferred verification options._`
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
            text: `PHONE OR EMAIL \n\n_Welldone a code has been sent to your phone._ \n_Please type the code and confirm to complete process._`
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
            text: `_Create your security question and answer for your transaction password using this format._ \nWhat is the name of my dog : Peggy`
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
        body: `DIDNT GET CODE \n\n_Sorry wait a minute_`,
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
            text: `PROCEED \n\n_While your transaction is processing you may now *take note of password and delete on WhatsApp* send 13 to begin_`
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
            text: `BEGIN \n\n_Welcome onboard._ \n_Fund your wallet through Messageframe to begin the use of voice-notes for subsequent transactions_ :-`
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
        body: `FUND \n\n_Fund wallet and send receipt afterwards_ \n\nBank name *:Moniepoint* \nCopy account *:Number*`,
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
            text: `TRANSFER \n\n_Send your command using voice note or chat._ \n_Provide below details and click proceed
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
        body: message || `_Processing your request..._`,
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
            text: `BENEFICIARIES \n\n_Create your list of beneficiaries._ \n_All names and must be unique._`
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
            text: `ADD BENEFICIARIES \n\n_Send names acct. & bank name followed by_ + _ to create list_ \nE.g\n\nKevin Bayem, 0000000000, Orapay`
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
            text: `EDIT \n\n_Edit and send names acct. & bank name followed by_ + sign _ to update list_ \nE.g\n\nKevin Bayem, 0000000000, Orapay`
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