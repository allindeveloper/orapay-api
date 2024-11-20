import { WhatsAppBaseService } from "../whatsapp.base";
import { selfRequestMessage, selfServiceMessage, vendorServicesMessageStep } from "../whatsapp.payloads";

export class VendorServicesStep extends WhatsAppBaseService {
    constructor() {
        super();
    }

    handleVendorServicesSelection = async (to: string) => {
        const vendorServicesMessagePayload = vendorServicesMessageStep(to);
        await this.sendWhatsAppMessage(vendorServicesMessagePayload);
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