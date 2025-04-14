/*
  # Create snippets schema

  1. New Tables
    - `snippets`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `title` (text)
      - `description` (text)
      - `code` (text)
      - `language` (text)
      - `is_public` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `snippets` table
    - Add policies for:
      - Users can read their own snippets
      - Users can read public snippets
      - Users can create their own snippets
      - Users can update their own snippets
      - Users can delete their own snippets
*/

CREATE TABLE IF NOT EXISTS snippets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  description text,
  code text NOT NULL,
  language text NOT NULL,
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE snippets ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own snippets
CREATE POLICY "Users can read own snippets"
  ON snippets
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Anyone can read public snippets
CREATE POLICY "Anyone can read public snippets"
  ON snippets
  FOR SELECT
  USING (is_public = true);

-- Policy: Users can create their own snippets
CREATE POLICY "Users can create own snippets"
  ON snippets
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own snippets
CREATE POLICY "Users can update own snippets"
  ON snippets
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own snippets
CREATE POLICY "Users can delete own snippets"
  ON snippets
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);