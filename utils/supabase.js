import { createClient } from "@supabase/supabase-js";
import { parseCookies } from "nookies";

const cookies = parseCookies();

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
  {
    global: {
      headers: {
        Authorization: `Bearer ${cookies.supabaseAccessToken}`,
      },
    },
  }
);
