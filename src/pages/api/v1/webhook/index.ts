import type { NextApiRequest, NextApiResponse } from 'next';
import { WhatsAppService } from 'services/whatsapp/whatsapp.service';
import { WhatsAppBody } from 'services/whatsapp/whatsapp.types';

const VERIFY_TOKEN = 'kevinpaywebhooktoken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const whatsappService = new WhatsAppService();
  if (req.method === 'GET') {
    // WhatsApp Webhook Verification
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
      } else {
        res.status(403).send('Forbidden'); // Invalid token
      }
    } else {
      res.status(400).send('Bad Request');
    }
  } else if (req.method === 'POST') {
    // Handle incoming messages
    const body = <WhatsAppBody>req.body;
    console.log("stringify body", body);
    if (!(body && body.entry && body.entry[0].changes && body.entry[0].changes[0].value.messages)) {
      res.status(404).send('No message found');
      return;
    }
    console.log("changes", body.entry[0].changes[0]);
    const allMessages = body.entry[0].changes[0].value.messages;

    await whatsappService.triggerMessagesLogic(allMessages)

    res.status(200).send('EVENT_RECEIVED');
  
  } else {
    res.status(405).send('Method Not Allowed'); // Only allow GET and POST
  }
}
