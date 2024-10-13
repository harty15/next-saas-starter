import { NextApiRequest, NextApiResponse } from 'next';
import { plaidClient } from '../../lib/plaid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: { client_user_id: req.session.userId },
      client_name: 'Your App Name',
      products: ['auth', 'transactions'],
      country_codes: ['US'],
      language: 'en',
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create link token' });
  }
}
