CREATE TABLE public.consultation_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 5 AND 30),
  event_date date,
  guests integer CHECK (guests IS NULL OR guests BETWEEN 1 AND 5000),
  event_type text CHECK (event_type IS NULL OR char_length(event_type) <= 50),
  notes text CHECK (notes IS NULL OR char_length(notes) <= 1000),
  language text CHECK (language IS NULL OR language IN ('en','ar','fa')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.consultation_requests TO anon, authenticated;
GRANT ALL ON public.consultation_requests TO service_role;
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a request" ON public.consultation_requests FOR INSERT TO anon, authenticated WITH CHECK (true);