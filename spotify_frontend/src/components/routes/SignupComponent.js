import React from "react";
import "./signupComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

function SignupComponent() {
  return (
    <>
      <nav className="navbar bg-dark Signup-Navbar">
        <div className="container Signup-Navbar-Container">
          <div className="Signup-Spotify">
            <FontAwesomeIcon className="Signup-Spotify-Logo" icon={faSpotify} />
            <span className="Signup-Spotify-Text">Spotify</span>
          </div>
        </div>
      </nav>

      <div className="container-fluid Signup-Container">
        <form className="Signup-Form">
          <div className="form-text Signup-Form-Text Signup-Form-Text-Center">
            <span> SIGN UP Free To Start Lintening</span>
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label Signup-Form-Label"
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control Signup-Form-Control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label Signup-Form-Label"
            >
              Confirm Email address
            </label>
            <input
              type="email"
              className="form-control Signup-Form-Control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Confirm your email"
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label Signup-Form-Label"
            >
              Create Password
            </label>
            <input
              type="password"
              className="form-control Signup-Form-Control"
              id="exampleInputPassword1"
              placeholder="Enter a strong password"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label Signup-Form-Label"
            >
              What should we call you?
            </label>
            <input
              type="password"
              className="form-control Signup-Form-Control"
              id="exampleInputPassword1"
              placeholder="Enter your username"
            />
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
