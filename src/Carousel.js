import { Component } from "react";

class Carousel extends Component {
  constructor() {
    super();
    this.state = { active: 0 };
  }

  handleImageIndex = (e) => {
    this.setState({
      active: +e.target.dataset.index,
    });
  };

  render() {
    const { images } = this.props;
    const { active } = this.state;
    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            <img
              key={photo}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
              data-index={index}
              onClick={this.handleImageIndex}
            />
          ))}
        </div>
      </div>
    );
  }
}

Carousel.defaultProps = {
  images: ["https://pets-images.dev-apis.com/pets/none.jpg"],
};

export default Carousel;
