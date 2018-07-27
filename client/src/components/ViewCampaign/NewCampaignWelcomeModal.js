import React from "react";
import { Button, Modal } from "react-bootstrap";

const btnStyle = {
  background: "#164c5f",
  textShadow: "none",
  outline: "none"
};

class NewCampaignWelcomeModal extends React.Component {
  render() {
    return (
      <div>
        <Modal
          keyboard={true}
          show={this.props.show}
          onHide={this.props.onHide}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "black" }}>
              You've activated your campaign!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ color: "black" }}>
            <h4 style={{ color: "black" }}>Here are some pro tips</h4>
            <section style={{ marginLeft: "1em" }}>
              <p>
                <span role="img" aria-label="thumbs up">
                  👍
                </span>{" "}
                Print a flier "Yes we Can"{" "}
              </p>
              <p>
                <span role="img" aria-label="clipboard">
                  📝
                </span>{" "}
                Gather signatures manually (Print this Doc){" "}
              </p>
              <p>
                <span role="img" aria-label="social share">
                  📲
                </span>Share via social media
              </p>
            </section>
          </Modal.Body>
          <Modal.Footer>
            <Button style={btnStyle} onClick={this.props.onHide}>
              Go To My Campaign!
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default NewCampaignWelcomeModal;
