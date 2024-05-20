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
import LoggedInHomeComponent from "./components/routes/LoggedInHomeComponent.js";
import LoggedInUploadSongsComponent from "./components/routes/LoggedInUploadSongsComponent.js";
import { useCookies } from "react-cookie";

function App() {
  const [cookies] = useCookies(["authToken"]);

  return (
    <Router>
      <div className="App">
        <Routes>
          {cookies.authToken ? (
            <>
              {/* Logged In Routes */}
              <Route path="/home" element={<LoggedInHomeComponent />} />
              <Route
                path="/uploadsong"
                element={<LoggedInUploadSongsComponent />}
              />
              <Route path="*" element={<Navigate to="/home" />} />
            </>
          ) : (
            <>
              {/* Logged Out Routes */}
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
