import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginComponent from "./components/routes/LoginComponent.js";
import SignupComponent from "./components/routes/SignupComponent.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<div>Hello</div>} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/signup" element={<SignupComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
