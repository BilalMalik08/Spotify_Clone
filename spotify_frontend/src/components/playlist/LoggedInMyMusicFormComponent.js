import "./loggedInMyMusicFormComponent.css";
import React, { useState, useEffect, useRef } from "react";
import { makeAuthenticatedGETRequest } from "../../utils/serverHelpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { Howl } from "howler";
import ErrorComponent from "../popups/ErrorComponent";

function LoggedInMyMusicFormComponent() {
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [audio, setAudio] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const seekBarRef = useRef(null);

  useEffect(() => {
    makeAuthenticatedGETRequest("/song/get/mysongs")
      .then((response) => {
        if (response && response.Data && response.Data.length > 0) {
          setSongs(response.Data);
        } else {
          setError(
            response && response.error ? response.error : "Unknown error"
          );
          setShowError(true);
        }
      })
      .catch((error) => {
        setError(error.message || "Unknown error");
        setShowError(true);
      });

    return () => {
      if (audio) {
        audio.unload();
      }
    };
  }, []);

  useEffect(() => {
    if (audio && isPlaying) {
      const intervalId = setInterval(() => {
        setCurrentTime(audio.seek());
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [audio, isPlaying]);

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

  const handleSeek = (event) => {
    const seekTo = event.target.value;
    if (audio) {
      audio.seek(seekTo);
      setCurrentTime(seekTo);
    }
  };

  return (
    <>
      <div className="row My-Music-FormComponent-Row1">
        <h3 className="My-Music-FormComponent-Heading">My Songs</h3>
      </div>
      <div className="row My-Music-FormComponent-Row2">
        <div className="container-fluid My-Music-FormComponent-Container">
          {songs.map((song, index) => (
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
                        {song.name || "Unknown Artist"}
                      </h5>
                      <p className="card-text My-Music-Text">
                        {"Uploaded by" +
                          " " +
                          song.artist.firstName +
                          " " +
                          song.artist.lastName}
                      </p>
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
                        <div className="sound-bars ">
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
          ))}
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

export default LoggedInMyMusicFormComponent;
