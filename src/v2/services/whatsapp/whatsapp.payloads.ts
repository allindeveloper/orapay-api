import { footerText, steps } from "./whatsapp.const";

export const initialStep = (to: string, name: string) => {
    return {
        messaging_product: 'whatsapp',
        to,
        type: 'interactive',
        interactive: {
            type: 'list',
            body: {
                text: `_Hello dear_ ${name} \n_Welcome to Orapay service, your  agency banking chatbot. Run secured financial errands through *WhatsApp voice notes.*_`
            },
            footer: { text: footerText },
            action: {
                button: 'Choose an option',
                sections: [
                    {
                        title: 'Services',
                        rows: [
                            { id: steps.OPEN.OPEN, title: '[1] Open Account', description: 'Create a new account' },
                            { id: steps.VENDOR.VENDOR, title: '[3] Vendor Services', description: 'Manage requests' },
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
            text: `_Thank you for contacting Orapay service!_ \n_Click below to speak with a customer support agent._`
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
            text: `_Send us your details and select done to proceed from the options below,_ \nNickname:\nEmail:\nState of residence:`
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
            text: `_Congratulations you are set. Verify this account using preferred verification options._`
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
            text: `_Your verification code has been sent to your preferred option confirm to complete process._`
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
            text: `_Create your security question and answer using the hint below._ \nWhat is the name of my dog : Peggy`
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
        body: `_Sorry wait a minute_`,
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
            text: `_While your transaction is processing you may now *take note of password and delete on WhatsApp* send 13 to begin_`
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
            text: `_Welcome onboard._ \n_Fund your wallet through Messageframe to begin the use of voice-notes for subsequent transactions_ :-`
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
        body: `_Fund wallet and send receipt afterwards_ \n\nBank name *:Moniepoint* \nCopy account *:Number*`,
    },
    footer: { text: footerText },
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

export const vendorServicesMessageStep = (to: string) => ({
    messaging_product: 'whatsapp',
    to,
    type: 'interactive',
    interactive: {
        type: 'list',
        body: {
            text: `_Select onf of your preferred options to service your request_`
        },
        footer: { text: footerText },
        action: {
            button: 'Select option',
            sections: [
                {
                    title: 'Vendor Services',
                    rows: [
                        { id: steps.VENDOR.VENDOR_SELF_SERVICE, title: '[1] Self Service' },
                        { id: steps.VENDOR.VENDOR_SELF_REQUEST, title: '[2] Self Request' },
                    ]
                }
            ]
        }
    },
});

export const selfServiceMessage = (to: string) => ({
    messaging_product: 'whatsapp',
    to,
    type: 'interactive',
    interactive: {
        type: "cta_url",
        body: {
            text: `_Click on the link for self service directly to vendors_`
        },
        action: {
            name: "cta_url",
            parameters: {
                display_text: "Self Service Link",
                url: `https://shorturl.at/hWwlH`
            }
        }
    }
});

export const selfRequestMessage = (to: string, name: string) => ({
    messaging_product: 'whatsapp',
    to,
    type: 'interactive',
    interactive: {
        type: "cta_url",
        body: {
            text: `_Hello dear_ ${name} \n_Glad to be of service to you, engage messageframe bot via voice note or chat using the link run this errands:_`
        },
        action: {
            name: "cta_url",
            parameters: {
                display_text: "Self Request Link",
                url: `https://shorturl.at/F5LGS`
            }
        }
    }
});
