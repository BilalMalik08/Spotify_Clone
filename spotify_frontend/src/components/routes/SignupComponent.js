import "./signupComponent.css";
import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { api } from "../../utils/api";
import SuccessComponent from "../popups/SuccessComponent";
import ErrorComponent from "../popups/ErrorComponent";

function SignupComponent() {
  const [cookie, setCookie] = useCookies(["authToken"]);
  const navigate = useNavigate();
  const initialFormData = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const signup = async (e) => {
    e.preventDefault();
    const { email, username, password, confirmPassword, firstName, lastName } =
      formData;

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setShowError(true);
      return;
    }

    const data = { email, username, password, firstName, lastName };

    try {
      const response = await axios.post(`${api}/auth/register`, data);
      console.log("User registered successfully:", response.data);
      if (response.data.token) {
        setCookie("authToken", response.data.token, {
          path: "/",
          expires: new Date(Date.now() + 2592000000),
        });
        setFormData(initialFormData);
        setSuccessMessage("User registered successfully!");
        setShowSuccess(true);
        setTimeout(() => {
          navigate("/home");
        }, 3000);
      } else {
        console.log("Token not found in response");
      }
    } catch (error) {
      console.error(
        "Error registering user:",
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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      <nav className="navbar bg-dark Signup-Navbar">
        <div className="container Signup-Navbar-Container">
          <div className="Signup-Spotify">
            <FontAwesomeIcon className="Signup-Spotify-Logo" icon={faSpotify} />
            <span className="Signup-Spotify-Text">Spotify</span>
          </div>
        </div>
      </nav>
      <div className="container-fluid Signup-Container">
        <form className="Signup-Form" onSubmit={signup}>
          <div className="form-text Signup-Form-Text Signup-Form-Text-Center">
            <span>SIGN UP Free To Start Listening</span>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label Signup-Form-Label">
              Email address
            </label>
            <input
              type="email"
              className="form-control Signup-Form-Control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              aria-describedby="emailHelp"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="username" className="form-label Signup-Form-Label">
              Username
            </label>
            <input
              type="text"
              className="form-control Signup-Form-Control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-3 Signup-Password-Container">
            <div className="Signup-Password-Field">
              <label
                htmlFor="password"
                className="form-label Signup-Form-Label"
              >
                Create Password
              </label>
              <input
                type="password"
                className="form-control Signup-Form-Control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter a strong password"
              />
            </div>
            <div className="Signup-Password-Field">
              <label
                htmlFor="confirmPassword"
                className="form-label Signup-Form-Label"
              >
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control Signup-Form-Control"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <div className="mb-3 Signup-Name-Container">
            <div className="Signup-Name-Field">
              <label
                htmlFor="firstName"
                className="form-label Signup-Form-Label"
              >
                First Name
              </label>
              <input
                type="text"
                className="form-control Signup-Form-Control"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
              />
            </div>
            <div className="Signup-Name-Field">
              <label
                htmlFor="lastName"
                className="form-label Signup-Form-Label"
              >
                Last Name
              </label>
              <input
                type="text"
                className="form-control Signup-Form-Control"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
              />
            </div>
          </div>
          <div className="Signup-Line"></div>
          <div className="Signup-BTN-Container">
            <button type="submit" className="btn btn-dark Signup-BTN">
              SIGN UP
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignupComponent;
