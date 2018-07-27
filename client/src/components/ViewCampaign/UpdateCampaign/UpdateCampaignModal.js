import React, { Component } from "react";
import {
  Button,
  ControlLabel,
  HelpBlock,
  FormControl,
  FormGroup,
  Modal
} from "react-bootstrap";

const btnStyle = {
  background: "#164c5f",
  textShadow: "none",
  outline: "none"
};

const FieldGroup = ({ id, help, label, ...props }) => (
  <FormGroup controlId={id}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...props} />
    {help && <HelpBlock>{help}</HelpBlock>}
  </FormGroup>
);

class UpdateCampaignModal extends Component {
  state = {
    buildingInformation: {
      numBuildings: "",
      numUnits: ""
    },
    wasteProvider: {
      address: "",
      email: "",
      phone: "",
      name: ""
    },
    propertyManager: {
      address: "",
      email: "",
      phone: "",
      name: ""
    }
  };

  handleBuildingInformationChange = e => {
    const { name, value } = e.target;
    console.log("name: ", name);
    this.setState({
      buildingInformation: { [name]: value }
    });
  };

  handlePropertyManagerChange = e => {
    const { name, value } = e.target;
    this.setState({
      propertyManager: { [name]: value }
    });
  };

  handleWasteProviderChange = e => {
    const { name, value } = e.target;
    this.setState({
      wasteProvider: { [name]: value }
    });
  };

  render() {
    const {
      buildingInformation,
      buttonText,
      onHide,
      propertyManager,
      show,
      title,
      wasteProvider
    } = this.props;
    return (
      <div>
        <Modal keyboard={true} show={show} onHide={onHide}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "black" }}>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ color: "black" }}>
            <form>
              <ControlLabel>Building Information</ControlLabel>
              {buildingInformation.map(info => {
                const { id, label, placeHolder, type, name } = info;
                return (
                  <FieldGroup
                    id={id}
                    label={label}
                    placeholder={placeHolder}
                    type={type}
                    name={name}
                    value={this.state.buildingInformation[name]}
                    onChange={this.handleBuildingInformationChange}
                  />
                );
              })}
              <ControlLabel>Property Manager Information</ControlLabel>
              {propertyManager.map(info => {
                const { id, label, placeHolder, type, name } = info;
                return (
                  <FieldGroup
                    id={id}
                    label={label}
                    placeholder={placeHolder}
                    type={type}
                    name={name}
                    value={this.state.propertyManager[name]}
                    onChange={this.handlePropertyManagerChange}
                  />
                );
              })}
              <ControlLabel>Waster Provider Information</ControlLabel>
              {wasteProvider.map(info => {
                const { id, label, placeHolder, type, name } = info;
                return (
                  <FieldGroup
                    id={id}
                    label={label}
                    placeholder={placeHolder}
                    type={type}
                    name={name}
                    value={this.state.wasteProvider[name]}
                    onChange={this.handleWasteProviderChange}
                  />
                );
              })}
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button style={btnStyle} onClick={onHide}>
              {buttonText}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default UpdateCampaignModal;
