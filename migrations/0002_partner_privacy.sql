-- Apply once to an existing D1 database before deploying the updated partner endpoint.
ALTER TABLE partner_applications ADD COLUMN privacy_notice_ack INTEGER NOT NULL DEFAULT 0 CHECK(privacy_notice_ack IN (0,1));
ALTER TABLE partner_applications ADD COLUMN ip_hash TEXT NOT NULL DEFAULT '';
CREATE INDEX IF NOT EXISTS idx_partners_ip_created ON partner_applications(ip_hash,created_at);
