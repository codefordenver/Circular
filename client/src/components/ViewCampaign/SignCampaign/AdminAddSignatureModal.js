import React from 'react';
import PropTypes from 'prop-types';
import { Button, ControlLabel, FormControl, FormGroup, HelpBlock, Modal } from 'react-bootstrap';
import SignatureCheckbox from './SignatureCheckbox';

const AdminAddSignatureModalData = [
  {
    id: 'firstName',
    label: 'First Name',
    name: 'firstName',
    placeholder: 'Sandra',
    type: 'text',
    validation: 'Must include a first name'
  },
  {
    id: 'lastName',
    label: 'Last Name',
    name: 'lastName',
    placeholder: 'Recyleson',
    type: 'text',
    validation: 'Must include a last name'
  },
  {
    id: 'email',
    label: 'Email',
    name: 'email',
    placeholder: 'sandra@recyclemore.net',
    type: 'email',
    validation: 'Must include a valid email'
  },
  {
    id: 'signerMessage',
    label: 'Signer Message',
    name: 'signerMessage',
    placeholder: "What's your recycle inspriation",
    type: 'textarea'
  }
];

const AdminAddSignatureModal = ({
  adminAddSignatureData,
  adminAddSignatureData: { formIsValid },
  handleAdminAddSignature,
  handleAdminAddSignatureModalDataChange,
  keepMeUpdated,
  onHide,
  show,
  toggleKeepMeUpdatedCheckbox
}) => (
  <div>
    <Modal keyboard show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: 'black' }}>Add Signer To Campaign </Modal.Title>
      </Modal.Header>
      <Modal.Body className="update-campaign-modal-body" style={{ color: 'black' }}>
        <form>
          {AdminAddSignatureModalData.map(field => {
            const { id, label, name, type, placeholder, validation } = field;
            return (
              <FormGroup key={id} controlId={id}>
                <ControlLabel>{label}</ControlLabel>
                <FormControl
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  value={adminAddSignatureData[id]}
                  onChange={e => handleAdminAddSignatureModalDataChange(e.target)}
                />
                {!formIsValid && <HelpBlock>{validation}</HelpBlock>}
              </FormGroup>
            );
          })}
          <SignatureCheckbox
            className="admin-add-signature"
            keepMeUpdated={keepMeUpdated}
            keepMeUpdatedLabel="Opt signer in to email updates"
            toggleKeepMeUpdatedCheckbox={toggleKeepMeUpdatedCheckbox}
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button disabled={!formIsValid} bsStyle="info" onClick={handleAdminAddSignature}>
          Add Signature To List
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
);

AdminAddSignatureModal.propTypes = {
  adminAddSignatureData: PropTypes.shape({}).isRequired,
  handleAdminAddSignature: PropTypes.func.isRequired,
  handleAdminAddSignatureModalDataChange: PropTypes.func.isRequired,
  keepMeUpdated: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  toggleKeepMeUpdatedCheckbox: PropTypes.func.isRequired
};

export default AdminAddSignatureModal;
