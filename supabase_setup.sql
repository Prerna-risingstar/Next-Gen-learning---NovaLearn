-- Create the courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  progress INTEGER NOT NULL DEFAULT 0,
  icon_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access for this prototype
CREATE POLICY "Allow public read access on courses" ON courses
  FOR SELECT USING (true);

-- Insert seed data
INSERT INTO courses (title, progress, icon_name)
VALUES
  ('Advanced React Patterns', 75, 'atom'),
  ('Server Components Deep Dive', 30, 'server'),
  ('Motion Design with Framer', 90, 'framer'),
  ('UI/UX Fundamentals', 15, 'pen-tool');
