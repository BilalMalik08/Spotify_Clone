import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginComponent from "./components/routes/LoginComponent.js";
import SignupComponent from "./components/routes/SignupComponent.js";
import HomeComponent from "./components/routes/HomeComponent.js";
import { useCookies } from "react-cookie";

function App() {
  const [cookies] = useCookies(["authToken"]);

  return (
    <Router>
      <div className="App">
        <Routes>
          {cookies.authToken ? (
            <>
              <Route path="/home" element={<HomeComponent />} />{" "}
              <Route path="*" element={<Navigate to="/home" />} />
            </>
          ) : (
            <>
              <Route path="/home" element={<HomeComponent />} />
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/signup" element={<SignupComponent />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
