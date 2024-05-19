import React from "react";
import "./cardsComponent.css";

function FocusComponent() {
  const cardData = [
    {
      title: "Atif Aslam",
      text: "Trending Songs",
      thumbnail: require("../../images/AtifAslam.jpg"),
    },
    {
      title: "Arijit Singh",
      text: "Latest Hits",
      thumbnail: require("../../images/ArijitSingh.jpg"),
    },
    {
      title: "Kaifi Khalil",
      text: "Top Tracks",
      thumbnail: require("../../images/KaifiKhalil.jpg"),
    },
    {
      title: "Dua Lipa",
      text: "Iconic Performances",
      thumbnail: require("../../images/DuaLipa.jpg"),
    },
    {
      title: "Momina",
      text: "Best Performances",
      thumbnail: require("../../images/MominaMustehsan.jpg"),
    },
  ];

  return (
    <>
      <div className="row Playlist-Row-1">
        <h3 className="heading">Focus</h3>
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

export default FocusComponent;
