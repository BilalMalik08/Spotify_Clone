import "./loginComponent.css";
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { api } from "../../utils/api";
import SuccessComponent from "../popups/SuccessComponent";
import ErrorComponent from "../popups/ErrorComponent";

function LoginComponent() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [cookie, setCookie] = useCookies(["authToken"]);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${api}/auth/login`, formData);
      console.log("Login successful:", response.data);
      if (response.data.token) {
        setCookie("authToken", response.data.token, {
          path: "/",
          expires: new Date(Date.now() + 2592000000),
        });
        setSuccessMessage("Login successful!");
        setShowSuccess(true);
        setTimeout(() => {
          navigate("/home");
        }, 3000);
      } else {
        console.log("Token not found in response");
      }
    } catch (error) {
      console.error(
        "Error logging in:",
        error.response ? error.response.data : error.message
      );
      setErrorMessage(
        error.response
          ? error.response.data.error
          : "An error occurred. Please try again."
      );
      setShowError(true);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {showSuccess && (
        <SuccessComponent
          message={successMessage}
          setShowSuccess={setShowSuccess}
        />
      )}
      {showError && (
        <ErrorComponent message={errorMessage} setShowError={setShowError} />
      )}
      <nav className="navbar bg-dark Login-Navbar">
        <div className="container Login-Navbar-Container">
          <div className="Login-Spotify">
            <FontAwesomeIcon className="Login-Spotify-Logo" icon={faSpotify} />
            <span className="Login-Spotify-Text">Spotify</span>
          </div>
        </div>
      </nav>

      <div className="container-fluid Login-Container">
        <form className="Login-Form" onSubmit={login}>
          <div className="form-text Login-Form-Text Login-Form-Text-Center">
            <span>To Continue, LOG IN To Spotify</span>
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label Login-Form-Label"
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control Login-Form-Control"
              id="exampleInputEmail1"
              name="email"
              value={formData.email}
              onChange={handleChange}
              aria-describedby="emailHelp"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label Login-Form-Label"
            >
              Password
            </label>
            <input
              type="password"
              className="form-control Login-Form-Control"
              id="exampleInputPassword1"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          <div className="Login-BTN-Container">
            <button type="submit" className="btn btn-dark Login-BTN">
              LOG IN
            </button>
          </div>

          <div className="Login-Line"></div>
          <div className="form-text Login-Form-Text">
            Don't have an account?
          </div>

          <div className="Login-Signup-BTN-Container">
            <Link to="/signup">
              <button type="button" className="btn btn-dark Login-Signup-BTN">
                SIGN UP FOR SPOTIFY
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginComponent;
