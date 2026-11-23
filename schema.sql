PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS leads (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 name TEXT NOT NULL,
 phone TEXT NOT NULL,
 email TEXT NOT NULL,
 place TEXT NOT NULL,
 category TEXT NOT NULL,
 description TEXT NOT NULL,
 consent INTEGER NOT NULL CHECK(consent=1),
 ip_hash TEXT NOT NULL,
 status TEXT NOT NULL DEFAULT 'new' CHECK(status IN ('new','contacted','assigned','closed','rejected')),
 created_at TEXT NOT NULL DEFAULT (datetime('now')),
 updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_ip_created ON leads(ip_hash,created_at);
CREATE TABLE IF NOT EXISTS partner_applications (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 company_name TEXT NOT NULL,
 contact_name TEXT NOT NULL,
 email TEXT NOT NULL,
 phone TEXT NOT NULL,
 trade TEXT NOT NULL,
 regions TEXT NOT NULL,
 note TEXT,
 privacy_notice_ack INTEGER NOT NULL DEFAULT 0 CHECK(privacy_notice_ack IN (0,1)),
 ip_hash TEXT NOT NULL DEFAULT '',
 created_at TEXT NOT NULL DEFAULT (datetime('now')),
 status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','approved','rejected'))
);
