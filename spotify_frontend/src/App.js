import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginComponent from "./components/routes/LoginComponent.js";
import SignupComponent from "./components/routes/SignupComponent.js";
import HomeComponent from "./components/routes/HomeComponent.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<div>Hello</div>} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/signup" element={<SignupComponent />} />
          <Route path="/home" element={<HomeComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
