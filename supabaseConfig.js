import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://lixgbffpefinudzrltwi.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpeGdiZmZwZWZpbnVkenJsdHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMTg3MzIsImV4cCI6MjA0ODg5NDczMn0.VA3Ap-yrn6lCexpGMxdP3H7Q_H7b5y7sytF75116Los";

// Initialize Supabase with AsyncStorage
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true, // Automatically refresh the session when the token expires
    persistSession: true, // Persist the session to AsyncStorage
    detectSessionInUrl: false, // Set to false for mobile apps
  },
});
