import React, { useEffect, useState } from "react";
import supabase from "./supabaseClient";

function HomeworkList() {
  const [homework, setHomework] = useState([]);
  const [description, setDescription] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isDone, setIsDone] = useState(false); // Zustand für erledigte Hausaufgabe

  const [subjects, setSubjects] = useState([]); // Fächer laden

  // Fächer laden
  useEffect(() => {
    async function fetchSubjects() {
      const { data, error } = await supabase.from("subjects").select("*");
      if (error) {
        console.error("Fehler beim Abrufen der Fächer:", error);
      } else {
        setSubjects(data);
      }
    }
    fetchSubjects();
  }, []);

  // Hausaufgaben laden
  useEffect(() => {
    async function fetchHomework() {
      const { data, error } = await supabase
        .from("homework")
        .select("*, subjects!fk_subject(name)");

      if (error) {
        console.error("Fehler beim Abrufen der Hausaufgaben:", error);
      } else {
        setHomework(data || []); // Fallback auf leeres Array, falls keine Daten vorhanden
      }
    }

    fetchHomework();
  }, []);

  async function addHomework() {
    if (!description || !subjectId || !dueDate) {
      console.error("Alle Felder müssen ausgefüllt sein.");
      return;
    }

    const { data, error } = await supabase
      .from("homework")
      .insert([
        {
          description: description,
          subject_id: subjectId,
          due_date: dueDate,
          is_done: isDone,
        },
      ])
      .select("*, subjects!fk_subject(name)");

    if (error) {
      console.error("Fehler beim Hinzufügen der Hausaufgabe:", error);
    } else {
      setHomework([...homework, data[0]]);
      setDescription("");
      setSubjectId("");
      setDueDate("");
      setIsDone(false);
    }
  }

  // Hausaufgabe als erledigt markieren
  async function toggleDone(id, currentStatus) {
    const { data, error } = await supabase
      .from("homework")
      .update({ is_done: !currentStatus })
      .eq("id", id);
    if (error) {
      console.error(
        "Fehler beim Markieren der Hausaufgabe als erledigt:",
        error
      );
    } else {
      const updatedHomework = homework.map((hw) =>
        hw.id === id ? { ...hw, is_done: !currentStatus } : hw
      );
      setHomework(updatedHomework);
    }
  }

  async function deleteHomework(id) {
    const { error } = await supabase.from("homework").delete().eq("id", id);

    if (error) {
      console.error("Fehler beim Löschen der Hausaufgabe:", error);
    } else {
      setHomework(homework.filter((hw) => hw.id !== id));
    }
  }

  return (
    <div>
      <h2>Hausaufgaben</h2>
      <ul>
        {homework.map((hw) => (
          <li
            key={hw.id}
            className="homework-item"
            style={{ backgroundColor: hw.is_done ? "#4CAF50" : "#4a4a4a" }}
          >
            <div className="homework-content">
              <span>
                {hw.description} - {hw.subjects?.name} (fällig: {hw.due_date})
              </span>
              <label>
                <input
                  type="checkbox"
                  checked={hw.is_done}
                  onChange={() => toggleDone(hw.id, hw.is_done)}
                />
                Erledigt
              </label>
            </div>
            <div className="button-container">
              <button
                onClick={() => deleteHomework(hw.id)}
                className="delete-button"
              >
                Löschen
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h3>Neue Hausaufgabe hinzufügen</h3>
      <div className="homework-input">
        <input
          type="text"
          placeholder="Beschreibung"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
        >
          <option value="">Wählen Sie ein Fach</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={addHomework}>Hinzufügen</button>
      </div>
    </div>
  );
}

export default HomeworkList;
