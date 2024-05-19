import "./sidebarComponent2.css";
import React from "react";
import { Link } from "react-router-dom";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHome,
  faSearch,
  faBook,
  faPlus,
  faHeart,
  faGlobe,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";

function LoggedInSidebarComponent() {
  return (
    <>
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
          <hr />
          <Link to="/createplaylist">
            <div className="nav-button">
              <FontAwesomeIcon className="fas" icon={faPlus} />
              <span>Create Playlist</span>
            </div>
          </Link>
          <Link to="/likedsongs">
            <div className="nav-button">
              <FontAwesomeIcon className="fas" icon={faHeart} />
              <span>Liked Songs</span>
            </div>
          </Link>
          <Link to="/likedsongs">
            <div className="nav-button">
              <FontAwesomeIcon className="fas" icon={faMusic} />
              <span>My Music</span>
            </div>
          </Link>
          <hr />
          <div className="english-btn-container2">
            <Link to="/english">
              <button className="english-btn2" type="submit">
                <FontAwesomeIcon className="fas" icon={faGlobe} />
                English
              </button>
            </Link>
          </div>
          <div id="nav-content-highlight"></div>
        </div>
      </div>
    </>
  );
}

export default LoggedInSidebarComponent;
