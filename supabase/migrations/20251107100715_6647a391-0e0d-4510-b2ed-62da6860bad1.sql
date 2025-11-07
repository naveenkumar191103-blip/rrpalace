-- Create rooms table
CREATE TABLE public.rooms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT NOT NULL,
  amenities TEXT[] NOT NULL DEFAULT '{}',
  image_url TEXT NOT NULL,
  available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID REFERENCES public.rooms(id) ON DELETE CASCADE NOT NULL,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to rooms
CREATE POLICY "Anyone can view rooms"
  ON public.rooms
  FOR SELECT
  USING (true);

-- Create policy for public to insert bookings
CREATE POLICY "Anyone can create bookings"
  ON public.bookings
  FOR INSERT
  WITH CHECK (true);

-- Create policy for authenticated users (admin) to view all bookings
CREATE POLICY "Authenticated users can view all bookings"
  ON public.bookings
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy for authenticated users (admin) to update bookings
CREATE POLICY "Authenticated users can update bookings"
  ON public.bookings
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create policy for authenticated users (admin) to manage rooms
CREATE POLICY "Authenticated users can insert rooms"
  ON public.rooms
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update rooms"
  ON public.rooms
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete rooms"
  ON public.rooms
  FOR DELETE
  TO authenticated
  USING (true);