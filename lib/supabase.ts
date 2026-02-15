import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
});

// ─── Types ────────────────────────────────────────────────────────────
export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  message: string;
  user_mode?: string;
  created_at?: string;
}

export interface PortfolioVisit {
  id?: string;
  user_mode?: string;
  referrer?: string;
  created_at?: string;
}

// ─── Queries ──────────────────────────────────────────────────────────
export async function submitContact(data: Omit<ContactMessage, 'id' | 'created_at'>) {
  const { error } = await supabase.from('contact_messages').insert([data]);
  if (error) throw error;
  return true;
}

export async function trackVisit(data: Omit<PortfolioVisit, 'id' | 'created_at'>) {
  const { error } = await supabase.from('portfolio_visits').insert([data]);
  if (error) console.warn('Visit tracking failed:', error.message);
}

export async function getDbLatency(): Promise<number> {
  const start = Date.now();
  await supabase.from('portfolio_visits').select('id').limit(1);
  return Date.now() - start;
}
