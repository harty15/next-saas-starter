-- Add new columns to the users table
ALTER TABLE users
ADD COLUMN IF NOT EXISTS plaid_access_token text;

-- Create new tables

-- Accounts table
CREATE TABLE IF NOT EXISTS accounts (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id int NOT NULL,
  institution_name text,
  account_name text,
  account_type text,
  account_subtype text,
  account_id text,
  balance numeric,
  created_at timestamp DEFAULT now() NOT NULL,
  updated_at timestamp DEFAULT now() NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  account_id int NOT NULL,
  transaction_id text NOT NULL UNIQUE,
  date date,
  name text,
  amount numeric,
  category text,
  category_id text,
  is_income boolean DEFAULT false,
  created_at timestamp DEFAULT now() NOT NULL,
  updated_at timestamp DEFAULT now() NOT NULL,
  FOREIGN KEY (account_id) REFERENCES accounts (id)
);

-- Budgets table
CREATE TABLE IF NOT EXISTS budgets (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id int NOT NULL,
  name text,
  monthly_limit numeric,
  created_at timestamp DEFAULT now() NOT NULL,
  updated_at timestamp DEFAULT now() NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Goals table
CREATE TABLE IF NOT EXISTS goals (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id int NOT NULL,
  name text,
  target_amount numeric,
  current_amount numeric,
  target_date date,
  created_at timestamp DEFAULT now() NOT NULL,
  updated_at timestamp DEFAULT now() NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Insights reports table
CREATE TABLE IF NOT EXISTS insights_reports (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id int NOT NULL,
  type text,
  data json,
  created_at timestamp DEFAULT now() NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);
