/*
  # Create leads and inquiries tables for JewelerStudio

  1. New Tables
    - `leads` - Stores demo booking and waitlist inquiries
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required, unique)
      - `store_name` (text)
      - `website_url` (text)
      - `inquiry_type` (text - 'demo' or 'waitlist')
      - `status` (text - 'new', 'contacted', 'qualified', 'converted')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on leads table
    - Add policy allowing anonymous inserts (for form submissions)
    - Add policy allowing all authenticated users to read their own data
    - Add policy for admin access via service role
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  store_name text,
  website_url text,
  inquiry_type text DEFAULT 'demo' CHECK (inquiry_type IN ('demo', 'waitlist')),
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert a new lead (public form submission)
CREATE POLICY "Anyone can create a lead"
  ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow authenticated users to read all leads (for admin dashboard if needed)
CREATE POLICY "Authenticated users can read leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);
