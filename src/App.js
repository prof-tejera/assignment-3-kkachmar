import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import "../src/App.css"; 

import DocumentationView from "./views/DocumentationView";
import TimersView from "./views/TimersView";
import AddView from "./views/AddView";
import WorkoutView from "./views/WorkoutView";
import HistoryView from "./views/HistoryView";

const Container = styled.div`
  background: #f0f6fb;
  height: 100vh;
  overflow: auto;
`;

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Timers</Link>
        </li>
        <li>
          <Link to="/docs">Documentation</Link>
        </li>
        <li>
          <Link to="/add">Add</Link>
        </li>
        <li>
          <Link to="/history">History</Link>
        </li>
      </ul>
    </nav>
  );
};

const App = () => {
  return (
    <Container style={{backgroundImage: 'linear-gradient(#005F96, #002034)'}}>
      <Router>
        <Nav />
        <Routes>
          <Route path="/docs" element={<DocumentationView />} />
          <Route path="/add" element={<AddView />} />
          <Route path="/workout/:workoutId" element={<WorkoutView />} />
          <Route path="/history" element={<HistoryView />} />
          <Route path="/" element={<TimersView />} />
        </Routes>
      </Router>
    </Container>
  );
};

export default App;
