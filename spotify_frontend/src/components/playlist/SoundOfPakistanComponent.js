import React from "react";
import "./cardsComponent.css";
import image from "../../image.jpg";

function SoundOfPakistanComponent() {
  const cardData = [
    { title: "Card title 1", text: "Text for card 1" },
    { title: "Card title 2", text: "Text for card 2" },
    { title: "Card title 3", text: "Text for card 3" },
    { title: "Card title 4", text: "Text for card 4" },
    { title: "Card title 5", text: "Text for card 5" },
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
                    src={image}
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

export default SoundOfPakistanComponent;
