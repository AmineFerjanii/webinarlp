CREATE TABLE public.webinar_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  job_title TEXT,
  phone TEXT,
  company TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.webinar_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert signups"
  ON public.webinar_signups
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view signups"
  ON public.webinar_signups
  FOR SELECT
  TO authenticated
  USING (true);