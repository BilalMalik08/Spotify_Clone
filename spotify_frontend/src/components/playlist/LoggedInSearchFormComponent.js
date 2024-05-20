import React, { useState, useRef, useEffect } from "react";
import "./loggedInSearchFormComponent.css";
import { makeAuthenticatedGETRequest } from "../../utils/serverHelpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { Howl } from "howler";
import ErrorComponent from "../popups/ErrorComponent";

function LoggedInSearchFormComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [audio, setAudio] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const seekBarRef = useRef(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await makeAuthenticatedGETRequest(
        `/song/get/songname/${encodeURIComponent(searchQuery)}`
      );
      if (response && response.Data && response.Data.length > 0) {
        setSongs(response.Data);
      } else {
        setError(
          response && response.error ? response.error : "No songs found"
        );
        setShowError(true);
      }
    } catch (error) {
      setError(error.message || "Unknown error");
      setShowError(true);
    }
  };

  const playAudio = (song) => {
    if (currentSong === song.track) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    } else {
      if (audio) {
        audio.unload();
      }
      const newAudio = new Howl({
        src: [song.track],
        html5: true,
        onplay: () => {
          setDuration(newAudio.duration());
          setCurrentTime(newAudio.seek());
        },
        onend: () => {
          setIsPlaying(false);
        },
      });
      setAudio(newAudio);
      setCurrentSong(song.track);
      newAudio.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (audio && isPlaying) {
      const intervalId = setInterval(() => {
        setCurrentTime(audio.seek());
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [audio, isPlaying]);

  const handleSeek = (event) => {
    const seekTo = event.target.value;
    if (audio) {
      audio.seek(seekTo);
      setCurrentTime(seekTo);
    }
  };

  return (
    <>
      <div className="row Search-FormComponent-Row1">
        <h3 className="container Search-FormComponent-Heading">Search Songs</h3>
        <div className="Search-Form-Container">
          <form className="d-flex" role="search" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-dark Cloudinary-BTN" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="row Search-FormComponent-Row2">
        <div className="container-fluid My-Music-FormComponent-Container">
          {songs.map((song, index) => {
            const artistName = song.artist
              ? `${song.artist.firstName} ${song.artist.lastName}`
              : null;

            return (
              <div className="card mb-3 My-Music-Card" key={index}>
                <div className="row My-Music-Row g-0">
                  <div className="col-md-1">
                    <img
                      src={song.thumbnail}
                      className="img-fluid My-Music-IMG"
                      alt="..."
                    />
                  </div>
                  <div className="col-md-11">
                    <div className="card-body My-Music-Body">
                      <div className="Title-Text-Container">
                        <h5 className="card-title My-Music-Title">
                          {song.name || "Unknown Title"}
                        </h5>
                        {artistName && (
                          <p className="card-text My-Music-Text">
                            {`Uploaded by ${artistName}`}
                          </p>
                        )}
                      </div>

                      {currentSong === song.track && (
                        <div className="Seekbar-Container">
                          <input
                            type="range"
                            min="0"
                            max={duration}
                            value={currentTime}
                            onChange={handleSeek}
                            ref={seekBarRef}
                            className="seek-bar"
                          />
                        </div>
                      )}

                      <div className="Icon-Container">
                        {currentSong === song.track && isPlaying && (
                          <div className="sound-bars">
                            <div className="sound-bar Green"></div>
                            <div className="sound-bar White"></div>
                            <div className="sound-bar Green"></div>
                            <div className="sound-bar White"></div>
                            <div className="sound-bar Green"></div>
                          </div>
                        )}
                        <FontAwesomeIcon
                          className={`My-Music-Icon ${
                            currentSong === song.track && isPlaying
                              ? "playing"
                              : ""
                          }`}
                          icon={
                            currentSong === song.track && isPlaying
                              ? faPause
                              : faPlay
                          }
                          onClick={() => playAudio(song)}
                        />
                        <FontAwesomeIcon
                          icon={faHeart}
                          className="My-Music-Icon"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="My-Music-FormComponent-Line"></div>
              </div>
            );
          })}
        </div>
      </div>
      {showError && (
        <div className="container">
          <ErrorComponent message={error} setShowError={setShowError} />
        </div>
      )}
    </>
  );
}

export default LoggedInSearchFormComponent;
