import { createBrowserClient } from "@supabase/ssr";

import type { Database } from "@/lib/supabase/types";
import { supabaseAnonKey, supabaseUrl } from "@/lib/supabase/env";

/** Supabase client for Client Components. */
export function createClient() {
  return createBrowserClient<Database>(supabaseUrl(), supabaseAnonKey());
}
