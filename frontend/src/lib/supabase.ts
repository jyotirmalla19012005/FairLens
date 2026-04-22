// frontend/src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("CRITICAL: Missing Supabase Environment Variables in .env.local");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/** * Note: Database Table 'bias_reports' will be handled in Step 11 SQL Execution.
 * Columns: id (uuid), created_at (timestamptz), user_id (text), 
 * file_name (text), metrics (jsonb), explanation (text).
 */
