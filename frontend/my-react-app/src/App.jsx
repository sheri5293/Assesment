// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupForm from "./Components/SignupForm";
import MainComponent from "./Components/MainComponent";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/MainComponent" element={<MainComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
