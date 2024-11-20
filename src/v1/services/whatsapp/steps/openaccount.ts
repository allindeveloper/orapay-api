import { WhatsAppBaseService } from "../whatsapp.base";
import { cancelMessageStep, confirmedActionStep, didNotSeeCodeActionStep, doneActionOpenAccountStep, donePhoneEmailActionStep, fundWalletMessageStep, proceedActionStep, welcomeOnboardMessageStep } from "../whatsapp.payloads";

export class OpenAccountStep extends WhatsAppBaseService {
    constructor() {
        super();
    }

    handleCancelSelection = async (to: string) => {
        const openStepMessagePayload = cancelMessageStep(to);
        await this.sendWhatsAppMessage(openStepMessagePayload);
    }

    handleDoneSelection = async (to:string) => {
        const doneMessagePayload = doneActionOpenAccountStep(to);
        await this.sendWhatsAppMessage(doneMessagePayload);
    }

    handlePhoneVerificationSelection = async (to:string) => {
        const emailStepPayload = donePhoneEmailActionStep(to);
        await this.sendWhatsAppMessage(emailStepPayload);
    }

    handleEmailVerificationSelection = async (to:string) => {
        const emailStepPayload = donePhoneEmailActionStep(to);
        await this.sendWhatsAppMessage(emailStepPayload);
    }

    handleVerificationConfirmedSelection = async (to:string) => {
        const emailStepPayload = confirmedActionStep(to);
        await this.sendWhatsAppMessage(emailStepPayload);
    }

    handleDidNotSeeCodeSelection = async (to:string) => {
        const didNotSeeCodePayload = didNotSeeCodeActionStep(to);
        await this.sendWhatsAppMessage(didNotSeeCodePayload);
    }

    handleProceedAfterSecurityQuestionSelection = async (to:string) => {
        const proceedPayload = proceedActionStep(to);
        await this.sendWhatsAppMessage(proceedPayload);
    }

    handleBeginSelection = async (to:string) => {
        const welcomePayload = welcomeOnboardMessageStep(to);
        await this.sendWhatsAppMessage(welcomePayload);
    }

    handleSendFundWalletSelection = async (to:string) => {
        const fundWalletPayload = fundWalletMessageStep(to);
        await this.sendWhatsAppMessage(fundWalletPayload);
    }
}