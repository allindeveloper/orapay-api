import { WhatsAppBaseService } from "../whatsapp.base";
import { processingRequestMessageStep, transferMessageStep } from "../whatsapp.payloads";

export class TransferStep extends WhatsAppBaseService {
    constructor() {
        super();
    }

    handleTransferSelection = async (to: string) => {
        const transferMessagePayload = transferMessageStep(to);
        await this.sendWhatsAppMessage(transferMessagePayload);
    }

    handleProceedSelection = async (to: string) => {
        const processingRequestMessagePayload = processingRequestMessageStep(to);
        await this.sendWhatsAppMessage(processingRequestMessagePayload);
    }

}