import "./sidebarComponent.css";
import React from "react";
import { Link } from "react-router-dom";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHome,
  faBook,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const SidebarComponent = () => {
  return (
    <div id="nav-bar">
      <input id="nav-toggle" type="checkbox" />
      <div id="nav-header">
        <Link id="nav-title" to="/home">
          SP
          <FontAwesomeIcon icon={faSpotify} />
          TIFY
        </Link>
        <label htmlFor="nav-toggle">
          <FontAwesomeIcon icon={faBars} />
        </label>
        <hr />
      </div>
      <div id="nav-content">
        <Link to="/home">
          <div className="nav-button">
            <FontAwesomeIcon className="fas" icon={faHome} />
            <span>Home</span>
          </div>
        </Link>
        <Link to="/search">
          <div className="nav-button">
            <FontAwesomeIcon className="fas" icon={faSearch} />
            <span>Search</span>
          </div>
        </Link>
        <Link to="/library">
          <div className="nav-button">
            <FontAwesomeIcon className="fas" icon={faBook} />
            <span>Library</span>
          </div>
        </Link>

        <div id="nav-content-highlight"></div>
      </div>
    </div>
  );
};

export default SidebarComponent;
