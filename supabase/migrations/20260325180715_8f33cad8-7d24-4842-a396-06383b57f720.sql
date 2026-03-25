-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Create vehicles table (managed by admin)
CREATE TABLE public.vehicles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL,
  year INTEGER NOT NULL DEFAULT 2025,
  price TEXT DEFAULT 'Sob consulta',
  engine TEXT,
  power TEXT,
  transmission TEXT,
  fuel_type TEXT,
  description TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create proposals table
CREATE TABLE public.proposals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create test_drives table
CREATE TABLE public.test_drives (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
  preferred_date DATE,
  preferred_time TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_drives ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checks
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User roles policies
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Vehicles policies (public read, admin write)
CREATE POLICY "Anyone can view active vehicles" ON public.vehicles FOR SELECT USING (active = true);
CREATE POLICY "Admins can view all vehicles" ON public.vehicles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert vehicles" ON public.vehicles FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update vehicles" ON public.vehicles FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete vehicles" ON public.vehicles FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Proposals policies
CREATE POLICY "Anyone can create proposals" ON public.proposals FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view own proposals" ON public.proposals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all proposals" ON public.proposals FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update proposals" ON public.proposals FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Test drives policies
CREATE POLICY "Anyone can create test drives" ON public.test_drives FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view own test drives" ON public.test_drives FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all test drives" ON public.test_drives FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update test drives" ON public.test_drives FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON public.vehicles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_proposals_updated_at BEFORE UPDATE ON public.proposals FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_test_drives_updated_at BEFORE UPDATE ON public.test_drives FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed vehicles data
INSERT INTO public.vehicles (name, brand, category, year, price, engine, power, transmission, fuel_type, description, featured) VALUES
('Jimny', 'Suzuki', 'Off-Road', 2025, 'Sob consulta', '1.5L Petrol', '102 CV', 'Manual 5V / Automático 4V', 'Gasolina', 'O lendário off-roader compacto. Capacidade 4x4 incomparável em chassis ladder frame.', true),
('Vitara', 'Suzuki', 'SUV', 2025, 'Sob consulta', '1.5L Hybrid', '115 CV', 'Automático 6V', 'Híbrido', 'SUV compacto versátil com tecnologia AllGrip e eficiência híbrida.', true),
('Swift', 'Suzuki', 'Sedan', 2025, 'Sob consulta', '1.2L DualJet', '83 CV', 'Manual 5V / CVT', 'Gasolina', 'Citadino ágil e económico. Design jovem com tecnologia de segurança avançada.', false),
('Glory 580', 'DFSK', 'SUV', 2025, 'Sob consulta', '1.5T Turbo', '150 CV', 'CVT', 'Gasolina', 'SUV espaçoso com 7 lugares, ideal para família. Equipamento completo a preço competitivo.', true),
('Glory 500', 'DFSK', 'SUV', 2025, 'Sob consulta', '1.5L', '116 CV', 'Manual 5V', 'Gasolina', 'SUV compacto acessível com design moderno e excelente relação qualidade-preço.', false),
('EC35', 'DFSK', 'Comercial', 2025, 'Sob consulta', 'Eléctrico', '60 kW', 'Automático', 'Eléctrico', 'Van eléctrica para logística urbana. Zero emissões, custo operacional mínimo.', false),
('Grenadier', 'Ineos', 'Off-Road', 2025, 'Sob consulta', '3.0L BMW B58 Turbo', '285 CV', 'Automático 8V ZF', 'Gasolina', 'O veículo utilitário sem compromissos. Construído para ir a qualquer lugar e fazer qualquer trabalho.', true),
('Quartermaster', 'Ineos', 'Pickup', 2025, 'Sob consulta', '3.0L BMW B57 Turbo Diesel', '249 CV', 'Automático 8V ZF', 'Diesel', 'Pickup robusta com plataforma de carga. A mesma capacidade off-road do Grenadier.', false),
('R 500', 'Scania', 'Camião', 2025, 'Sob consulta', '13L V8', '500 CV', 'Opticruise', 'Diesel', 'Camião de longa distância com máxima eficiência de combustível e conforto para o motorista.', true),
('G 410', 'Scania', 'Camião', 2025, 'Sob consulta', '13L Inline-6', '410 CV', 'Opticruise', 'Diesel', 'Versátil para construção e distribuição regional. Robusto para condições angolanas.', false);