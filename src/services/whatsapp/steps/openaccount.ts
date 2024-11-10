import { WhatsAppBaseService } from "../whatsapp.base";
import { cancelMessageStep, doneActionOpenAccountStep } from "../whatsapp.payloads";

export class OpenAccountStep extends WhatsAppBaseService {
    constructor() {
        super();
    }


    handleCancelSelection = async (to: string) => {
        const openStepMessagePayload = cancelMessageStep(to);
        await this.sendWhatsAppMessage(openStepMessagePayload);
    }

    handleDoneSelection = async (to:string) => {
        const openStepMessagePayload = doneActionOpenAccountStep(to);
        await this.sendWhatsAppMessage(openStepMessagePayload);
    }
}