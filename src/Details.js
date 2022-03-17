import { Component } from "react";
import { withRouter } from "react-router-dom";

import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundray";
import Modal from "./Modal";

import ThemeContext from "./ThemeContext";

class Details extends Component {
  constructor() {
    super();
    this.state = { loading: true, showModal: false };
  }

  async componentDidMount() {
    console.log(this.props);
    try {
      const res = await fetch(
        `https://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
      );
      const details = await res.json();
      console.log("Pet Details: ", details);
      this.setState(Object.assign({ loading: false }, details.pets[0]));
    } catch (error) {
      throw new Error("API error....: ", error);
    }
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => (window.location = "https://bit.ly/pet-adopt");

  render() {
    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;
    if (this.state.loading) {
      return <p className="loading">Loading............</p>;
    }

    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <ThemeContext.Consumer>
                    {([theme]) => (
                      <>
                        <button
                          style={{ backgroundColor: theme }}
                          onClick={this.adopt}
                        >
                          Adopt {name}
                        </button>
                        <button
                          style={{ backgroundColor: theme }}
                          onClick={this.toggleModal}
                        >
                          close
                        </button>
                      </>
                    )}
                  </ThemeContext.Consumer>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const DetailsWithRouter = withRouter(Details);

function DetailsWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <DetailsWithRouter />
    </ErrorBoundary>
  );
}

export default withRouter(DetailsWithErrorBoundary);
