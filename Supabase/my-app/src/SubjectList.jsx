import React, { useEffect, useState } from "react";
import supabase from "./supabaseClient";

function SubjectList() {
  const [subjects, setSubjects] = useState([]); // Fächer
  const [newSubject, setNewSubject] = useState(""); // Neuer State für Eingabefeld

  // Fächer laden
  useEffect(() => {
    async function fetchSubjects() {
      const { data, error } = await supabase.from("subjects").select("*");
      if (error) {
        console.error("Fehler beim Abrufen der Fächer:", error);
      } else if (data && data.length > 0) {
        setSubjects(data); // Fächer in den State setzen
      } else {
        console.log("Keine Fächer gefunden.");
      }
    }
    fetchSubjects();
  }, []); // Fächer nur beim ersten Laden abrufen

  async function addSubject() {
    if (!newSubject.trim()) {
      alert("Bitte geben Sie einen Fachnamen ein.");
      return;
    }

    const { data, error } = await supabase
      .from("subjects")
      .insert([{ name: newSubject }])
      .select();

    if (error) {
      console.error("Fehler beim Hinzufügen des Fachs:", error);
      alert("Fehler beim Hinzufügen des Fachs");
    } else {
      setSubjects([...subjects, data[0]]);
      setNewSubject(""); // Eingabefeld zurücksetzen
    }
  }

  async function deleteSubject(id) {
    const { error } = await supabase.from("subjects").delete().eq("id", id);

    if (error) {
      console.error("Fehler beim Löschen des Fachs:", error);
      alert("Fehler beim Löschen des Fachs");
    } else {
      setSubjects(subjects.filter((subject) => subject.id !== id));
    }
  }

  return (
    <div>
      <h2>Fächer</h2>

      <ul>
        {subjects.length > 0 ? (
          subjects.map((subject) => (
            <li key={subject.id} className="subject-item">
              <span>{subject.name}</span>
              <div className="button-container">
                <button
                  onClick={() => deleteSubject(subject.id)}
                  className="delete-button"
                >
                  Löschen
                </button>
              </div>
            </li>
          ))
        ) : (
          <li>Keine Fächer verfügbar</li>
        )}
      </ul>

      {/* Neues Fach Eingabebereich unter der Liste */}
      <div className="subject-input">
        <input
          type="text"
          placeholder="Neues Fach eingeben"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
        />
        <button onClick={addSubject}>Fach hinzufügen</button>
      </div>
    </div>
  );
}

export default SubjectList;
