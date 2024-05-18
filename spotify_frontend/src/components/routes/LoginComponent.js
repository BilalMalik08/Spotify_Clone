import React from "react";
import "./loginComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

function LoginComponent() {
  return (
    <>
      <nav className="navbar bg-dark Login-Navbar">
        <div className="container Login-Navbar-Container">
          <div className="Login-Spotify">
            <FontAwesomeIcon className="Login-Spotify-Logo" icon={faSpotify} />
            <span className="Login-Spotify-Text">Spotify</span>
          </div>
        </div>
      </nav>

      <div className="container-fluid Login-Container">
        <form className="Login-Form">
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
              aria-describedby="emailHelp"
              placeholder="Enter your email"
            />
            <div className="form-text Login-Form-Text" id="emailHelp">
              We'll never share your email with anyone else.
            </div>
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
              <button type="submit" className="btn btn-dark Login-Signup-BTN">
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
