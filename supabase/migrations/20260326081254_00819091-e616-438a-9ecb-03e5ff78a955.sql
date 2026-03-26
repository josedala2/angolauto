
-- News table
CREATE TABLE public.news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  summary text,
  content text,
  image_url text,
  category text NOT NULL DEFAULT 'sector',
  published boolean NOT NULL DEFAULT false,
  published_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published news" ON public.news FOR SELECT TO public USING (published = true);
CREATE POLICY "Admins can manage news" ON public.news FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Job applications table
CREATE TABLE public.job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  area text,
  message text,
  cv_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit applications" ON public.job_applications FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Admins can view applications" ON public.job_applications FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Workshop bookings table
CREATE TABLE public.workshop_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  vehicle_info text,
  service_type text NOT NULL DEFAULT 'manutencao',
  preferred_date date,
  description text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.workshop_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create bookings" ON public.workshop_bookings FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Admins can manage bookings" ON public.workshop_bookings FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can view own bookings" ON public.workshop_bookings FOR SELECT TO public USING (auth.uid() = user_id);

-- Storage bucket for CVs
INSERT INTO storage.buckets (id, name, public) VALUES ('cvs', 'cvs', true);

CREATE POLICY "Anyone can upload CVs" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'cvs');
CREATE POLICY "Admins can view CVs" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'cvs' AND public.has_role(auth.uid(), 'admin'));
