import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uetusamgvjyxgjfqqtat.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVldHVzYW1ndmp5eGdqZnFxdGF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczMDk0OTMsImV4cCI6MjA1Mjg4NTQ5M30.ew1qsT9mb7J3aPOosoA6pQhjRwd1S1SpAZRkTZeFLe0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
