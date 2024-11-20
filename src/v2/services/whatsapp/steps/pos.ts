import { WhatsAppBaseService } from "../whatsapp.base";
import { posServiceMessageStep, selfRequestMessage, selfServiceMessage } from "../whatsapp.payloads";

export class PosServiceStep extends WhatsAppBaseService {
    constructor() {
        super();
    }

    handlePosServicesSelection = async (to: string) => {
        const posServiceMessagePayload = posServiceMessageStep(to);
        await this.sendWhatsAppMessage(posServiceMessagePayload);
    }

    handleSelfServiceSelection = async (to: string) => {
        const selfServiceMessagePayload = selfServiceMessage(to);
        await this.sendWhatsAppMessage(selfServiceMessagePayload);
    }

    handleSelfRequestSelection = async (to: string, name: string) => {
        const selfRequestMessagePayload = selfRequestMessage(to, name);
        await this.sendWhatsAppMessage(selfRequestMessagePayload);
    }

}