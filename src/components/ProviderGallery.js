import React from "react";
import PropTypes from "prop-types";
import LoadingScreen from "./common/LoadingScreen";
import { withRouter } from "react-router-dom";
import Context from "../utils/context";

class Gallery extends React.Component {
  // TASK 3a:
  // Complete the Gallery component to include functionality
  // On click on left or right arrows, the gallery should change its image
  // On click of the thumbnails, the image selected should be updated as well
  // On click of the "Read more" button in the selected Image, it should redirect to the Selected Provider View.
  //
  //
  // Task 3b:
  // Write tests for the Gallery component. Tests should be written in the Gallery.spec.js file in the __tests__ folder.
  //
  //
  // ============== CODE GOES BELOW THIS LINE :) ==============

  constructor(props) {
    super(props);
    this.state = {
      activeID: 2,
    };
  }

  render() {
    const { items } = this.props;
    if (!items || items.length === 0) {
      return <LoadingScreen />;
    }

    const { activeID } = this.state;

    return (
      <Context.Consumer>
        {(context) => (
          <div data-testid="gallery" className="box-shadow gallery">
            <div className="gallery__slider">
              <div className="gallery__slider-item-wrapper">
                {items
                  .filter((key) => key.id < activeID)
                  .map((key) => (
                    <div
                      key={key.id}
                      className="gallery__slider-item prev"
                      style={{
                        backgroundImage: `url(${key.imageUrl})`,
                      }}
                    ></div>
                  ))}

                {items
                  .filter((key) => key.id === activeID)
                  .map((key) => (
                    <div
                      className="gallery__slider-item active"
                      key={key.id}
                      style={{ zIndex: 2 }}
                    >
                      <img
                        src={key.imageUrl}
                        className="gallery__slider-item active"
                        alt=""
                      />
                      <div className="gallery__slider-item__info">
                        <div className="gallery__slider-item__info-name">
                          {key.name}
                        </div>
                        <div className="gallery__slider-item__info-description">
                          {key.description}
                          <a
                            onClick={() => {
                              context.updateState({
                                ...context.state,
                                ...{ items, id: key.id },
                              });
                              this.props.history.push("/view-provider");
                            }}
                          >
                            <p className="read-more">Click to View</p>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}

                {items
                  .filter((key) => key.id > activeID)
                  .map((key) => (
                    <div
                      key={key.id}
                      className="gallery__slider-item next"
                      style={{
                        backgroundImage: `url(${key.imageUrl})`,
                      }}
                    ></div>
                  ))}
              </div>
              <div className="gallery__slider-controls">
                <button
                  className="gallery__slider-controls__button left"
                  onClick={(e) => {
                    this.setState({
                      activeID:
                        this.state.activeID !== 1
                          ? this.state.activeID - 1
                          : items.length,
                    });
                  }}
                >
                  <i className="fa fa-chevron-left"></i>
                </button>

                <button
                  className="gallery__slider-controls__button right"
                  onClick={(e) => {
                    this.setState({
                      activeID:
                        this.state.activeID < items.length
                          ? this.state.activeID + 1
                          : 1,
                    });
                  }}
                >
                  <i className="fa fa-chevron-right"></i>
                </button>
              </div>
            </div>
            <div className="gallery__thumbnails">
              {items.map((key) => (
                <div
                  key={key.id}
                  onClick={(e) => {
                    this.setState({ activeID: key.id });
                  }}
                  className="gallery__thumbnails__item active"
                  style={{
                    backgroundImage: `url(${key.imageUrl})`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        )}
      </Context.Consumer>
    );
  }
}

Gallery.propTypes = {
  startFrom: PropTypes.number,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
      name: PropTypes.string,
      description: PropTypes.string,
    })
  ).isRequired,
  onClick: PropTypes.instanceOf(Function),
};

export default withRouter(Gallery);
