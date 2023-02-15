import { createClient } from "@supabase/supabase-js";
import { parseCookies } from "nookies";

const cookies = parseCookies();

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY,
  {
    global: {
      headers: {
        Authorization: `Bearer ${cookies.supabaseAccessToken}`,
      },
    },
  }
);
