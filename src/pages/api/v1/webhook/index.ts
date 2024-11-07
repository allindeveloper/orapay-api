import type { NextApiRequest, NextApiResponse } from 'next';
import { WhatsAppService } from 'services/whatsapp/whatsapp.service';

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
      res.status(400).send('Bad Request'); // Missing parameters
    }
  } else if (req.method === 'POST') {
    // Handle incoming messages
    const body = req.body;

    if (body && body.entry && body.entry[0].changes && body.entry[0].changes[0].value.messages) {
      const message = body.entry[0].changes[0].value.messages[0];
      const from = message.from; // The phone number of the user who sent the message
      const msgBody = message.text?.body || '';

      console.log(`Changes Object`, body.entry[0].changes[0]);

      console.log(`Messages Object`, message);
      
      console.log(`Received message from ${from}: ${msgBody}`);

      // Send a response back using WhatsApp API
      await whatsappService.sendWhatsAppMessage(from, 'Hello! This is an automated response.');

      res.status(200).send('EVENT_RECEIVED');
    } else {
      res.status(404).send('No message found');
    }
  } else {
    res.status(405).send('Method Not Allowed'); // Only allow GET and POST
  }
}
