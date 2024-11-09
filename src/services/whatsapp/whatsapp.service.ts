import { buttonMessage, initialStep } from "./whatsapp.payloads";
import { MessageType, WhatsAppMessagePayload } from "./whatsapp.types";

const BASE_URL = process.env.BASE_URL;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN
export class WhatsAppService {

    triggerMessagesLogic = async (messageDto: WhatsAppMessagePayload[]) => {
        const mostRecentMessage = messageDto[0];
        const fromPhoneNumber = mostRecentMessage.from;
        const name = mostRecentMessage.contacts?.[0]?.profile?.name || 'Valued Customer';

        const isFirstMessage = ["hello", "hi"].includes((mostRecentMessage.text?.body ?? "").toLowerCase());

        if (isFirstMessage) {
            const payload = initialStep(fromPhoneNumber, name);
            await this.sendInteractiveWhatsAppMessage(payload);
            return;
        }

        const isFromInteractiveMessage = mostRecentMessage.type === MessageType.INTERACTIVE
        if (isFromInteractiveMessage) {
            const customerChoice = mostRecentMessage.interactive?.list_reply.title
            // handle major actions from interactive list
            if (customerChoice?.includes("Customer Support")) {
                await this.handleCustomerSupport(fromPhoneNumber)
            }
        }
    }

    handleCustomerSupport = async (to: string) => {
        const buttonMessagePayload = buttonMessage(to);
        await this.sendWhatsAppMessage(buttonMessagePayload);
    }

    sendWhatsAppMessage = async (payload: object) => {
        const url = `${BASE_URL}/${PHONE_NUMBER_ID}/messages`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            console.log('Message sent:', data);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    sendRegularWhatsAppMessage = async (to: string, message: string) => {
        const url = `${BASE_URL}/${PHONE_NUMBER_ID}/messages`;

        const payload = {
            messaging_product: 'whatsapp',
            to,
            type: 'text',
            text: { body: message },
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            console.log('Message sent:', data);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    sendInteractiveWhatsAppMessage = async (payload: object) => {
        const url = `${BASE_URL}/${PHONE_NUMBER_ID}/messages`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            console.log('Message sent:', data);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }
}

