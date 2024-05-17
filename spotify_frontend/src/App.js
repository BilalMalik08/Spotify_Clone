import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginComponent from "./components/routes/LoginComponent.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<div>Hello</div>} />
          <Route path="/login" element={<LoginComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
