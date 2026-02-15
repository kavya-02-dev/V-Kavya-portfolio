-- ============================================================
-- KAVYA PORTFOLIO — SUPABASE DATABASE SCHEMA
-- Run this in your Supabase SQL editor
-- ============================================================

-- ─── Extensions ─────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Contact Messages Table ─────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name        TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  email       TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  message     TEXT NOT NULL CHECK (char_length(message) BETWEEN 10 AND 5000),
  user_mode   TEXT CHECK (user_mode IN ('recruiter', 'developer', 'curious', 'unknown')),
  ip_hash     TEXT,           -- Hashed IP for spam detection (no raw IP stored)
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Portfolio Visits Table ──────────────────────────────────
CREATE TABLE IF NOT EXISTS portfolio_visits (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_mode   TEXT,
  referrer    TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Row-Level Security (RLS) ────────────────────────────────
-- Enable RLS on all tables (security-first!)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_visits ENABLE ROW LEVEL SECURITY;

-- Contact messages: anyone can INSERT (public form), no one can SELECT (private)
CREATE POLICY "allow_public_insert_contact"
  ON contact_messages FOR INSERT
  TO anon
  WITH CHECK (true);

-- Admin can read contact messages (use service_role key in admin dashboard only)
CREATE POLICY "allow_service_read_contact"
  ON contact_messages FOR SELECT
  TO service_role
  USING (true);

-- Portfolio visits: anyone can INSERT, no one can read raw (analytics only)
CREATE POLICY "allow_public_insert_visits"
  ON portfolio_visits FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "allow_service_read_visits"
  ON portfolio_visits FOR SELECT
  TO service_role
  USING (true);

-- ─── Rate Limiting (via Supabase Edge) ──────────────────────
-- Note: Actual rate limiting is done at the Supabase Edge Function level.
-- The contact form is limited to 5 submissions per IP per hour.
-- Implement in edge function or Next.js middleware.

-- ─── Analytics View ──────────────────────────────────────────
CREATE OR REPLACE VIEW portfolio_analytics AS
SELECT
  DATE_TRUNC('day', created_at) AS date,
  user_mode,
  COUNT(*) AS visit_count
FROM portfolio_visits
GROUP BY 1, 2
ORDER BY 1 DESC;

-- ─── Indexes for performance ──────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_messages (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_visits_created ON portfolio_visits (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_visits_mode ON portfolio_visits (user_mode);

-- ─── Verify Setup ─────────────────────────────────────────────
SELECT 'Schema created successfully ✓' AS status;
