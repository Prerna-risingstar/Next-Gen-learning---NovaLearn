-- Add user_id to courses table
ALTER TABLE courses ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Update existing rows (if any) to belong to the first user or leave them as NULL
-- (If you want to clear out the old mock data, uncomment the line below)
-- DELETE FROM courses WHERE user_id IS NULL;

-- Enable RLS on courses table if not already enabled
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Drop previous public policy if it exists
DROP POLICY IF EXISTS "Allow public read access on courses" ON courses;

-- Create policy for authenticated users to view only their own courses
CREATE POLICY "Users can view own courses" ON courses
  FOR SELECT USING (auth.uid() = user_id);

-- (Optional but recommended) Policy to allow users to update their own courses
CREATE POLICY "Users can update own courses" ON courses
  FOR UPDATE USING (auth.uid() = user_id);

-- Create a function to automatically seed data when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.courses (user_id, title, progress, icon_name)
  VALUES
    (new.id, 'Advanced React Patterns', 75, 'atom'),
    (new.id, 'Server Components Deep Dive', 30, 'server'),
    (new.id, 'Motion Design with Framer', 90, 'framer'),
    (new.id, 'UI/UX Fundamentals', 15, 'pen-tool');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
