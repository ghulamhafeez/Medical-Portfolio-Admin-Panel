import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY } from "../../constants/Constant";
import { SUPABASE_URL } from "../../constants/Constant";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
