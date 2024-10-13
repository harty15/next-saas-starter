import { NextApiRequest, NextApiResponse } from 'next';
import { plaidClient } from '../../lib/plaid';
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { public_token } = req.body;
  try {
    const response = await plaidClient.itemPublicTokenExchange({ public_token });
    const accessToken = response.data.access_token;
    
    await prisma.user.update({
      where: { id: req.session.userId },
      data: { plaidAccessToken: accessToken },
    });

    await updateUserFinancialData(req.session.userId, accessToken);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to exchange public token' });
  }
}
