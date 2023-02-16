import { createClient } from "@supabase/supabase-js";
import { parseCookies } from "nookies";
import { Database } from "../types/supabase";


const cookies = parseCookies();

export const supabase = createClient<Database>(
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
