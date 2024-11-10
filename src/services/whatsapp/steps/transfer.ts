import { WhatsAppBaseService } from "../whatsapp.base";
import { cancelMessageStep, confirmedActionStep, didNotSeeCodeActionStep, doneActionOpenAccountStep, donePhoneEmailActionStep, proceedActionStep, transferMessageStep, welcomeOnboardMessageStep } from "../whatsapp.payloads";

export class TransferStep extends WhatsAppBaseService {
    constructor() {
        super();
    }

    handleTransferSelection = async (to: string) => {
        const transferMessagePayload = transferMessageStep(to);
        await this.sendWhatsAppMessage(transferMessagePayload);
    }


}