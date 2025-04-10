export const steps = {
    OPEN: {
        OPEN: "Open",
        OPEN_ACCOUNT: "Open-[1]-Open Account",
        OPEN_DONE: "Open-[5]-Done",
        OPEN_CANCEL: "Open-[6]-Cancel",
        DONE: {
            DONE: "Done",
            DONE_OPEN_PHONE: "Open-Done-[7]-Phone",
            DONE_OPEN_EMAIL: "Open-Done-[8]-Email",
            DONE_OPEN_CONFIRMED: "Open-Done-[9]-Confirmed",
            DONE_OPEN_DID_NOT_SEE_CODE: "Open-Done-[10]-Didn’t see the code",
            DONE_OPEN_CONFIRMED_PROCEED: "Open-Done-Confirmed-[9]-Proceed",
            DONE_OPEN_NO_CODE_2FA: "Open-Done-Confirmed-[9]-2FA",
            DONE_OPEN_BEGIN: "Open-Done-Confirmed-Proceed-[9]-Begin",
            DONE_OPEN_FUND_WALLET: "Open-Done-Confirmed-Proceed-Begin-[9]-Fund wallet"
        }
    },
    TRANSFER: {
        TRANSFER: "Transfer",
        TRANSFER_PROCEED: "Transfer-[P]-Proceed"
    },
    BENEFICIARIES: {
        BENEFICIARIES: "BENEFICIARIES",
        BENEFICIARIES_CREATE: "BENEFICIARIES-CREATE[+]-Create",
        BENEFICIARIES_EDIT: "BENEFICIARIES-CREATE[+]-Edit",
        BENEFICIARIES_CREATE_PROCEED: "BENEFICIARIES-CREATE[+]-Create-Proceed",
        BENEFICIARIES_EDIT_PROCEED: "BENEFICIARIES-CREATE[+]-Edit-Proceed"
    }
} 

export const footerText = `V1.0  Powered by Messageframe®️`;

export const envVariables = {
    BASE_URL: process.env.BASE_URL,
    PHONE_NUMBER_ID: process.env.PHONE_NUMBER_ID,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    supportPhoneNumber: process.env.SUPPORT_PHONE_NUMBER,
};