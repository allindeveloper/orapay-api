import { WhatsAppBaseService } from "../whatsapp.base";
import { cancelMessageStep, confirmedActionStep, doneActionOpenAccountStep, donePhoneEmailActionStep } from "../whatsapp.payloads";

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
}