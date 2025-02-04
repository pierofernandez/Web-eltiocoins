import { createClient } from "@supabase/supabase-js";
import { Database } from "./supabase";


const subabaseUrl = import.meta.env.VITE_PROYECT_URL_SUPABASE;
const subabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;


export const supabase = createClient<Database>(subabaseUrl, subabaseKey);