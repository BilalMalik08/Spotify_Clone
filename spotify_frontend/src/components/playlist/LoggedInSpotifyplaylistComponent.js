import React from "react";
import "./cardsComponent.css";

function LoggedInSpotifyPlaylistComponent() {
  const cardData = [
    {
      title: "Atif's Playlist",
      text: "Best of Atif Aslam",
      thumbnail: require("../../images/AtifPlaylist.jpg"),
    },
    {
      title: "Arijit's Playlist",
      text: "Top Tracks by Arijit",
      thumbnail: require("../../images/ArijitPlaylist.jpg"),
    },
    {
      title: "Kaifi's Playlist",
      text: "Must-listen Songs KK",
      thumbnail: require("../../images/KaifiPlaylist.jpg"),
    },
    {
      title: "Dua's Playlist",
      text: "Performances by Dua",
      thumbnail: require("../../images/DuaPlaylist.jpg"),
    },
    {
      title: "Momina's Playlist",
      text: "Hits by Momina",
      thumbnail: require("../../images/MominaPlaylist.jpg"),
    },
  ];

  return (
    <>
      <div className="row Playlist-Row-1">
        <h3 className="heading">Playlists</h3>
        <div className="cards">
          <div className="row row-cols-1 row-cols-md-5 g-1">
            {cardData.map((card, index) => (
              <div className="col" key={index}>
                <div className="card Card">
                  <img
                    src={card.thumbnail}
                    className="card-img-top Card-Img-Top"
                    alt="..."
                  />
                  <div className="card-body Card-Body">
                    <h5 className="card-title Card-Title">{card.title}</h5>
                    <p className="card-text">{card.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default LoggedInSpotifyPlaylistComponent;
