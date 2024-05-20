import "./loggedInMyMusicFormComponent.css";
import React, { useState, useEffect } from "react";
import { makeAuthenticatedGETRequest } from "../../utils/serverHelpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { Howl, Howler } from "howler";

function LoggedInMyMusicFormComponent() {
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);
  const [audio, setAudio] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    console.log("Fetching songs...");
    makeAuthenticatedGETRequest("/song/get/mysongs")
      .then((response) => {
        console.log("Response:", response);
        if (response && response.Data && response.Data.length > 0) {
          setSongs(response.Data);
        } else {
          setError(
            response && response.error ? response.error : "Unknown error"
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching songs:", error);
        setError(error.message || "Unknown error");
      });

    // Cleanup function
    return () => {
      if (audio) {
        audio.unload();
      }
    };
  }, []);

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
        html5: true, // Use HTML5 audio
      });
      newAudio.play();
      setAudio(newAudio);
      setCurrentSong(song.track);
      setIsPlaying(true);
    }
  };

  if (error) {
    return <div>Error fetching songs: {error}</div>;
  }

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
                        {song.artist.firstName + " " + song.artist.lastName}
                      </p>
                    </div>
                    <div className="Icon-Container">
                      <FontAwesomeIcon
                        className="My-Music-Icon"
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
    </>
  );
}

export default LoggedInMyMusicFormComponent;
