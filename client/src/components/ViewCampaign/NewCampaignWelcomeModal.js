import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

const btnStyle = {
  background: '#164c5f',
  textShadow: 'none',
  outline: 'none'
};

const NewCampaignWelcomeModal = ({ onHide, show }) => (
  // if (!show) {
  //   return null;
  // }

  <div>
    <Modal keyboard show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>You've activated your campaign!</Modal.Title>
      </Modal.Header>
      <Modal.Body className="New-Campaign-Welcome-Modal-Wrapper">
        <h4 id="welcome-modal-header">Here are some pro tips</h4>
        <section style={{ marginLeft: '1em' }}>
          <p id="emoji-span">
            <span role="img" aria-label="right arrow">
              ➡️
            </span>{' '}
            Sign the campaign!
          </p>
          <p>
            <span role="img" aria-label="thumbs up">
              👍
            </span>{' '}
            <a
              href={`${process.env.PUBLIC_URL}/flyer.pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Print the YES WE CAN Flier
            </a>
          </p>
          <p>
            <span role="img" aria-label="clipboard">
              📝
            </span>{' '}
            <a
              href={`${process.env.PUBLIC_URL}/CollectSignatures.pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Gather signatures manually
            </a>
          </p>
          <p>
            <span role="img" aria-label="social share">
              📲
            </span>{' '}
            Share via social media
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

NewCampaignWelcomeModal.propTypes = {
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};

export default NewCampaignWelcomeModal;
