import "./navbarComponent.css";
import React from "react";
import { Link } from "react-router-dom";

function LoggedInNavbarComponent() {
  return (
    <>
      <nav className="navbar navbar-expand-lg Navbar">
        <div className="container-fluid Container-Fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="nav justify-content-center">
              <li class="nav-item">
                <Link class="nav-link">Premium</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="#">
                  Support
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="#">
                  Downloads
                </Link>
              </li>
            </ul>
            <span className="line">|</span>
            <form className="d-flex" role="search">
              <Link to="/signup">
                <button className="btn btn-dark  btn-signup" type="submit">
                  Upload
                </button>
              </Link>
              <Link to="/login">
                <button className="btn btn-light btn-login" type="submit">
                  Bilal
                </button>
              </Link>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default LoggedInNavbarComponent;
