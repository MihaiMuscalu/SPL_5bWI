import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://uetusamgvjyxgjfqqtat.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVldHVzYW1ndmp5eGdqZnFxdGF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczMDk0OTMsImV4cCI6MjA1Mjg4NTQ5M30.ew1qsT9mb7J3aPOosoA6pQhjRwd1S1SpAZRkTZeFLe0"
);

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    setCountries(data);
  }

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name}>{country.name}</li>
      ))}
    </ul>
  );
}

export default App;
