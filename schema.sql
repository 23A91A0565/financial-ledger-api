-- ============================
-- Financial Ledger Schema
-- ============================

-- ACCOUNTS TABLE
CREATE TABLE IF NOT EXISTS accounts (
  id CHAR(36) PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL,
  account_type VARCHAR(20) NOT NULL,
  currency VARCHAR(10) NOT NULL,
  status VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TRANSACTIONS TABLE
CREATE TABLE IF NOT EXISTS transactions (
  id CHAR(36) PRIMARY KEY,
  type VARCHAR(20) NOT NULL,
  source_account_id CHAR(36),
  destination_account_id CHAR(36),
  amount DECIMAL(18,2) NOT NULL,
  currency VARCHAR(10) NOT NULL,
  status VARCHAR(20) NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- LEDGER ENTRIES TABLE (IMMUTABLE DOUBLE ENTRY)
CREATE TABLE IF NOT EXISTS ledger_entries (
  id CHAR(36) PRIMARY KEY,
  account_id CHAR(36) NOT NULL,
  transaction_id CHAR(36) NOT NULL,
  entry_type ENUM('DEBIT','CREDIT') NOT NULL,
  amount DECIMAL(18,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (account_id) REFERENCES accounts(id),
  FOREIGN KEY (transaction_id) REFERENCES transactions(id)
);
