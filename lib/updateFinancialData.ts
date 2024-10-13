import { plaidClient } from './plaid';
import { prisma } from './prisma';

export async function updateUserFinancialData(userId: number, accessToken: string) {
  try {
    // Fetch accounts and balances
    const accountsResponse = await plaidClient.accountsGet({ access_token: accessToken });
    const accounts = accountsResponse.data.accounts;

    // Fetch transactions
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const transactionsResponse = await plaidClient.transactionsGet({
      access_token: accessToken,
      start_date: thirtyDaysAgo.toISOString().split('T')[0],
      end_date: now.toISOString().split('T')[0],
    });
    const transactions = transactionsResponse.data.transactions;

    // Update database
    await prisma.$transaction(async (prisma) => {
      // Update accounts
      for (const account of accounts) {
        await prisma.account.upsert({
          where: { accountId: account.account_id },
          update: {
            balance: account.balances.current,
            institutionName: account.name,
            accountName: account.official_name || account.name,
            accountType: account.type,
            accountSubtype: account.subtype,
          },
          create: {
            userId,
            accountId: account.account_id,
            balance: account.balances.current,
            institutionName: account.name,
            accountName: account.official_name || account.name,
            accountType: account.type,
            accountSubtype: account.subtype,
          },
        });
      }

      // Update transactions
      for (const transaction of transactions) {
        await prisma.transaction.upsert({
          where: { transactionId: transaction.transaction_id },
          update: {
            date: new Date(transaction.date),
            name: transaction.name,
            amount: transaction.amount,
            category: transaction.category ? transaction.category[0] : null,
            categoryId: transaction.category_id,
            isIncome: transaction.amount < 0,
          },
          create: {
            accountId: transaction.account_id,
            transactionId: transaction.transaction_id,
            date: new Date(transaction.date),
            name: transaction.name,
            amount: transaction.amount,
            category: transaction.category ? transaction.category[0] : null,
            categoryId: transaction.category_id,
            isIncome: transaction.amount < 0,
          },
        });
      }
    });
  } catch (error) {
    console.error('Failed to update financial data:', error);
  }
}
