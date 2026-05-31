-- First, delete the old courses
DELETE FROM courses;

-- Insert the customized seed data
INSERT INTO courses (title, progress, icon_name)
VALUES
  ('DSA', 75, 'code'),
  ('Machine Learning', 30, 'brain'),
  ('PHP nd MongoDB(NoSQL)', 90, 'database'),
  ('UI/UX Fundamentals', 15, 'pen-tool'),
  ('React js', 15, 'atom');
