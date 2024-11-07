
const BASE_URL = process.env.BASE_URL;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN
export class WhatsAppService {
    

    // Function to send a message back using WhatsApp API
    sendWhatsAppMessage = async (to: string, message: string) => {
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
}

