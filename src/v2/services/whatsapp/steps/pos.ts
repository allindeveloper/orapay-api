import { WhatsAppBaseService } from "../whatsapp.base";
import { posFinalMessage, posServiceMessageStep, selfRequestMessage, selfServiceMessage } from "../whatsapp.payloads";

export class PosServiceStep extends WhatsAppBaseService {
    constructor() {
        super();
    }

    handlePosServicesSelection = async (to: string) => {
        const posServiceMessagePayload = posServiceMessageStep(to);
        await this.sendWhatsAppMessage(posServiceMessagePayload);
    }

    handleTransferSelection = async (to: string) => {
        const posFinalMessagePayload = posFinalMessage(to);
        await this.sendWhatsAppMessage(posFinalMessagePayload);
    }

    handleWithdrawalSelection = async (to: string) => {
        const withdrawalMessagePayload = posFinalMessage(to);
        await this.sendWhatsAppMessage(withdrawalMessagePayload);
    }

    handleMintRequestSelection = async (to: string) => {
        const mintRequestPayload = posFinalMessage(to);
        await this.sendWhatsAppMessage(mintRequestPayload);
    }

}