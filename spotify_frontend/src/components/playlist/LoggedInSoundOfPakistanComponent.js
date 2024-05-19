import React from "react";
import "./cardsComponent.css";

function LoggedInSoundOfPakistanComponent() {
  const cardData = [
    {
      title: "Aima Baig",
      text: "Top Hits",
      thumbnail: require("../../images/AimaBaig.jpg"),
    },
    {
      title: "Qurat Ul Ain",
      text: "Chart-Toppers",
      thumbnail: require("../../images/QuratUlAin.jpg"),
    },
    {
      title: "Farhan Saeed",
      text: "Popular Tracks",
      thumbnail: require("../../images/FarhanSaeed.jpg"),
    },
    {
      title: "Meesha Shafi",
      text: "Memorable Gigs",
      thumbnail: require("../../images/MeeshaShafi.jpg"),
    },
    {
      title: "Asim Azhar",
      text: "Fan Favorites",
      thumbnail: require("../../images/AsimAzhar.jpg"),
    },
  ];

  return (
    <>
      <div className="row Playlist-Row-1">
        <h3 className="heading">Sound Of Pakistan</h3>
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

export default LoggedInSoundOfPakistanComponent;
