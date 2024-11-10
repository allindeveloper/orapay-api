import { WhatsAppBaseService } from "../whatsapp.base";
import { cancelMessageStep } from "../whatsapp.payloads";

export class OpenAccountStep extends WhatsAppBaseService {
    constructor() {
        super();
    }


    handleCancelSelection = async (to: string) => {
        const openStepMessagePayload = cancelMessageStep(to);
        await this.sendWhatsAppMessage(openStepMessagePayload);
    }
}