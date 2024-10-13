import { db } from './drizzle';
import { users, accounts, transactions, budgets, goals, insightsReports } from './schema';
import { faker } from '@faker-js/faker';

async function seed() {
  console.log('Seeding database...');

  // Seed users
  const userIds = await db.insert(users).values([
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      passwordHash: faker.internet.password(),
      plaidAccessToken: faker.string.alphanumeric(20),
    },
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      passwordHash: faker.internet.password(),
      plaidAccessToken: faker.string.alphanumeric(20),
    },
  ]).returning({ id: users.id });

  for (const userId of userIds) {
    // Seed accounts
    const accountIds = await db.insert(accounts).values([
      {
        userId: userId.id,
        institutionName: faker.company.name(),
        accountName: 'Checking',
        accountType: 'depository',
        accountSubtype: 'checking',
        accountId: faker.string.alphanumeric(10),
        balance: faker.number.float({ min: 100, max: 10000, precision: 0.01 }).toString(),
      },
      {
        userId: userId.id,
        institutionName: faker.company.name(),
        accountName: 'Savings',
        accountType: 'depository',
        accountSubtype: 'savings',
        accountId: faker.string.alphanumeric(10),
        balance: faker.number.float({ min: 1000, max: 50000, precision: 0.01 }).toString(),
      },
    ]).returning({ id: accounts.id });

    // Seed transactions
    for (const accountId of accountIds) {
      await db.insert(transactions).values(
        Array.from({ length: 10 }, () => ({
          accountId: accountId.id,
          transactionId: faker.string.alphanumeric(15),
          date: faker.date.recent().toISOString().split('T')[0], // Convert to YYYY-MM-DD format
          name: faker.finance.transactionDescription(),
          amount: faker.number.float({ min: 1, max: 1000, precision: 0.01 }).toString(),
          category: faker.finance.transactionType(),
          categoryId: faker.string.alphanumeric(5),
          isIncome: faker.datatype.boolean(),
        }))
      );
    }

    // Seed budgets
    await db.insert(budgets).values([
      {
        userId: userId.id,
        name: 'Groceries',
        monthlyLimit: faker.number.float({ min: 200, max: 1000, precision: 0.01 }).toString(),
      },
      {
        userId: userId.id,
        name: 'Entertainment',
        monthlyLimit: faker.number.float({ min: 50, max: 500, precision: 0.01 }).toString(),
      },
    ]);

    // Seed goals
    await db.insert(goals).values([
      {
        userId: userId.id,
        name: 'Vacation Fund',
        targetAmount: faker.number.float({ min: 1000, max: 5000, precision: 0.01 }).toString(),
        currentAmount: faker.number.float({ min: 0, max: 1000, precision: 0.01 }).toString(),
        targetDate: faker.date.future().toISOString().split('T')[0], // Convert to YYYY-MM-DD format
      },
      {
        userId: userId.id,
        name: 'Emergency Fund',
        targetAmount: faker.number.float({ min: 5000, max: 20000, precision: 0.01 }).toString(),
        currentAmount: faker.number.float({ min: 1000, max: 5000, precision: 0.01 }).toString(),
        targetDate: faker.date.future().toISOString().split('T')[0], // Convert to YYYY-MM-DD format
      },
    ]);

    // Seed insights reports
    await db.insert(insightsReports).values([
      {
        userId: userId.id,
        type: 'monthly_summary',
        data: JSON.stringify({
          total_income: faker.number.float({ min: 2000, max: 10000, precision: 0.01 }),
          total_expenses: faker.number.float({ min: 1000, max: 8000, precision: 0.01 }),
          top_spending_categories: [
            { category: 'Food', amount: faker.number.float({ min: 200, max: 1000, precision: 0.01 }) },
            { category: 'Transportation', amount: faker.number.float({ min: 100, max: 500, precision: 0.01 }) },
          ],
        }),
      },
    ]);
  }

  console.log('Seeding complete!');
}

seed().catch(console.error);
