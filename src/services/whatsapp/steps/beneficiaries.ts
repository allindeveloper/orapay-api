import { WhatsAppBaseService } from "../whatsapp.base";
import { beneficiariesAddMessageStep, beneficiariesEditMessageStep, beneficiariesMessageStep, processingRequestMessageStep } from "../whatsapp.payloads";

export class BeneficiariesStep extends WhatsAppBaseService {
    constructor() {
        super();
    }

    handleBeneficiariesSelection = async (to: string) => {
        const beneficiariesMessagePayload = beneficiariesMessageStep(to);
        await this.sendWhatsAppMessage(beneficiariesMessagePayload);
    }

    handleBeneficiariesCreateSelection = async (to: string) => {
        const createMessagePayload = beneficiariesAddMessageStep(to);
        await this.sendWhatsAppMessage(createMessagePayload);
    }

    handleBeneficiariesCreateProceedSelection = async (to: string) => {
        const processingMessagePayload = processingRequestMessageStep(to, "Creating Beneficiaries, please hold...");
        await this.sendWhatsAppMessage(processingMessagePayload);
    }

    handleBeneficiariesEditSelection = async (to: string) => {
        const editMessagePayload = beneficiariesEditMessageStep(to);
        await this.sendWhatsAppMessage(editMessagePayload);
    }

    handleBeneficiariesEditProceedSelection = async (to: string) => {
        const processingMessagePayload = processingRequestMessageStep(to, "Handling request, please hold...");
        await this.sendWhatsAppMessage(processingMessagePayload);
    }

}