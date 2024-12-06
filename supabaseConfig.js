import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = URL;
const SUPABASE_KEY = KEY;

// Initialize Supabase with AsyncStorage
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true, // Automatically refresh the session when the token expires
    persistSession: true, // Persist the session to AsyncStorage
    detectSessionInUrl: false, // Set to false for mobile apps
  },
});
