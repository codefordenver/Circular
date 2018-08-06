import React from "react";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

const btnStyle = {
  background: "#164c5f",
  textShadow: "none",
  outline: "none"
};

const NewCampaignWelcomeModal = ({ onHide, show }) => {
  if (!show) {
    return null;
  }

  return (
    <div>
      <Modal keyboard show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "black" }}>You've activated your campaign!</Modal.Title>
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
          <Button style={btnStyle} onClick={onHide}>
            Go To My Campaign!
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

NewCampaignWelcomeModal.propTypes = {
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};

export default NewCampaignWelcomeModal;
