import React from "react";
import { Routes, Route } from "react-router-dom";
import Workout from "./pages/Workout";
import WorkoutPlan from "./pages/WorkoutPlan";
import Homepage from "./pages/Homepage";

function App() {
  return <>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/predict" element={<Workout />} />
      <Route path="/get_workout_plan" element={<WorkoutPlan />} />
    </Routes>
  </>
}

export default App;