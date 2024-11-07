import type { NextApiRequest, NextApiResponse } from 'next';

const VERIFY_TOKEN = 'kevinpaywebhooktoken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
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
    // Handle Incoming Messages
    const body = req.body;

    console.log('Received webhook message:', body);

    // Respond to acknowledge receipt of the message
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.status(405).send('Method Not Allowed'); // Only allow GET and POST
  }
}
