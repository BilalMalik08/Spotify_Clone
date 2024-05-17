import React from "react";
import "./loginComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

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
        <form>
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
            />
          </div>

          <button type="submit" className="btn btn-primary Login-BTN">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default LoginComponent;
