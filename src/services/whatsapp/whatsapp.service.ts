
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const PHONE_NUMBER_ID = process.env.NEXT_PUBLIC_PHONE_NUMBER_ID;
const NEXT_PUBLIC_ACCESS_TOKEN = process.env.NEXT_PUBLIC_ACCESS_TOKEN
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
              Authorization: `Bearer ${NEXT_PUBLIC_ACCESS_TOKEN}`,
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

