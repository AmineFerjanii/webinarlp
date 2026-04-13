-- Add language + email sequence tracking columns to webinar_signups

ALTER TABLE webinar_signups
  ADD COLUMN IF NOT EXISTS language TEXT NOT NULL DEFAULT 'fr',
  ADD COLUMN IF NOT EXISTS confirmation_sent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS reminder_3d_sent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS reminder_1d_sent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS reminder_1h_sent_at TIMESTAMPTZ;
