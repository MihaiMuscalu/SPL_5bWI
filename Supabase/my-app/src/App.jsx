import React from "react";
import SubjectList from "./SubjectList";
import HomeworkList from "./HomeworkList";
import "./App.css";

function App() {
  return (
    <div>
      <h1>Hausaufgabenliste</h1>
      <SubjectList />
      <HomeworkList />
    </div>
  );
}

export default App;
