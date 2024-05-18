import "./cardsComponent.css";
import image from "../../image.jpg";

function FocusComponent() {
  return (
    <>
      <div className="row Playlist-Row-1">
        <h3 className="heading">Focus</h3>
        <div className="cards">
          <div class="row row-cols-1 row-cols-md-5 g-1">
            <div class="col">
              <div class="card Card">
                <img src={image} class="card-img-top Card-Img-Top" alt="..." />
                <div class="card-body Card-Body">
                  <h5 class="card-title Card-Title">Card title</h5>
                  <p class="card-text">
                    This is a longer card with supporting text below as a
                    natural lead-in to additional content. This content is a
                    little bit longer.
                  </p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card Card">
                <img src={image} class="card-img-top Card-Img-Top" alt="..." />
                <div class="card-body Card-Body">
                  <h5 class="card-title Card-Title">Card title</h5>
                  <p class="card-text">
                    This is a longer card with supporting text below as a
                    natural lead-in to additional content. This content is a
                    little bit longer.
                  </p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card Card">
                <img src={image} class="card-img-top Card-Img-Top" alt="..." />
                <div class="card-body Card-Body">
                  <h5 class="card-title Card-Title">Card title</h5>
                  <p class="card-text">
                    This is a longer card with supporting text below as a
                    natural lead-in to additional content.
                  </p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card Card ">
                <img src={image} class="card-img-top Card-Img-Top" alt="..." />
                <div class="card-body Card-Body">
                  <h5 class="card-title Card-Title">Card title</h5>
                  <p class="card-text">
                    This is a longer card with supporting text below as a
                    natural lead-in to additional content. This content is a
                    little bit longer.
                  </p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card Card">
                <img src={image} class="card-img-top Card-Img-Top" alt="..." />
                <div class="card-body Card-Body">
                  <h5 class="card-title Card-Title">Card title</h5>
                  <p class="card-text">
                    This is a longer card with supporting text below as a
                    natural lead-in to additional content. This content is a
                    little bit longer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FocusComponent;
