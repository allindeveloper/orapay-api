const BASE_URL = process.env.BASE_URL;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

export class WhatsAppBaseService {

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
}

