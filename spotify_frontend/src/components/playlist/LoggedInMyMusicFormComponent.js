import React from "react";
import "./loggedInMyMusicFormComponent.css";
import img from "../../images/AimaBaig.jpg";

function LoggedInMyMusicFormComponent() {
  const songs = [
    { title: "Song 1", artist: "Artist 1", duration: "3:33", thumbnail: img },
    { title: "Song 2", artist: "Artist 2", duration: "4:15", thumbnail: img },
    { title: "Song 3", artist: "Artist 3", duration: "2:57", thumbnail: img },
  ];

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
                        {song.artist}
                      </h5>
                      <p className="card-text My-Music-Text">{song.title}</p>
                    </div>
                    <p className="card-text My-Music-Text">{song.duration}</p>
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
