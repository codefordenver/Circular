import React, { Component } from "react";
import {
  Button,
  ControlLabel,
  HelpBlock,
  FormControl,
  FormGroup,
  Modal,
  Tab,
  Tabs
} from "react-bootstrap";
import merge from "lodash.merge";
import wasteProviders from "../../../utils/wasteProviders";

class UpdateCampaignModal extends Component {
  constructor(props) {
    super(props);
    const {
      buildingInformation,
      propertyManager,
      wasteProvider
    } = props.activeCampaign;
    // SETS STATE OF THE FORM FROM PROPS.ACTIVECAMPAIGN
    this.state = {
      buildingInformation: { ...buildingInformation },
      propertyManager: { ...propertyManager },
      wasteProvider: { ...wasteProvider },
      key: 1
    };
  }

  handleFormSubmit = () => {
    const { buildingInformation, propertyManager, wasteProvider } = this.state;
    const buildingUpdates = {
      buildingInformation,
      propertyManager,
      wasteProvider
    };
    this.props.handleUpdateCampaign({ ...buildingUpdates });
    this.props.toggleShowUpdateCampaignModal();
    this.setState({ activeTab: 1 });
  };

  handleBuildingInformationChange = e => {
    const { name, value } = e.target;
    // const newBuildingData = merge({}, this.state.buildingInformation, { [name]: value });
    // (() => {
    //   this.setState({ buildingInformation: newBuildingData });
    // })();
    (() =>
      this.setState(prevState => ({
        ...prevState,
        buildingInformation: {
          ...prevState.buildingInformation,
          [name]: value
        }
      })))();
  };

  handlePropertyManagerChange = e => {
    const { name, value } = e.target;
    const newPropertyManagerData = merge({}, this.state.propertyManager, {
      [name]: value
    });
    (() => {
      this.setState({ propertyManager: newPropertyManagerData });
    })();
  };

  handleWasteProviderChange = e => {
    const { name, value } = e.target;
    const newWasteProviderData = merge({}, this.state.wasteProvider, {
      [name]: value
    });
    (() => {
      this.setState({ wasteProvider: newWasteProviderData });
    })();
  };

  handleTabSwitch = key => {
    this.setState({ key });
  };

  render() {
    const {
      activeCampaign,
      activeCampaign: { address },
      buildingInformation,
      buttonText,
      onHide,
      propertyManager,
      show,
      wasteProvider
    } = this.props;
    const wasteProvidersSelect = wasteProviders.map(provider => {
      <FormControl>
        <option key={provider.phone} id={provider.phone}>
          {provider.name}
        </option>;
      </FormControl>;
    });
    console.log(activeCampaign.wasteProvider.name === "");
    return (
      <div>
        <Modal keyboard={true} show={show} onHide={onHide}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "black" }}>
              Update details for {address}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ color: "black" }}>
            <form>
              <Tabs
                activeKey={this.state.key}
                onSelect={this.handleTabSwitch}
                id="updateCampaignModalForm"
              >
                <Tab eventKey={1} title="Building">
                  {this.state.buildingInformation &&
                    buildingInformation.map(info => {
                      const { id, label, placeHolder, type, name } = info;
                      return (
                        <FormGroup
                          style={{ marginTop: "1em" }}
                          controlId={id}
                          key={id}
                        >
                          <ControlLabel>{label}</ControlLabel>
                          <FormControl
                            name={name}
                            type={type}
                            value={this.state.buildingInformation[name]}
                            placeholder={placeHolder}
                            onChange={this.handleBuildingInformationChange}
                          />
                          {/* {help && <HelpBlock>{help}</HelpBlock>} */}
                        </FormGroup>
                      );
                    })}
                </Tab>
                <Tab
                  style={{ marginTop: "1em" }}
                  eventKey={2}
                  title="Property Manager"
                >
                  {this.state.propertyManager &&
                    propertyManager.map(info => {
                      const { id, label, placeHolder, type, name } = info;
                      return (
                        <FormGroup controlId={id} key={id}>
                          <ControlLabel>{label}</ControlLabel>
                          <FormControl
                            name={name}
                            type={type}
                            value={this.state.propertyManager[name]}
                            placeholder={placeHolder}
                            onChange={this.handlePropertyManagerChange}
                          />
                          {/* {help && <HelpBlock>{help}</HelpBlock>} */}
                        </FormGroup>
                      );
                    })}
                </Tab>
                <Tab
                  style={{ marginTop: "1em" }}
                  eventKey={3}
                  title="Waste Provider"
                >
                  {this.state.wasteProvider &&
                    wasteProvider.map(info => {
                      const { id, label, placeHolder, type, name } = info;
                      return (
                        <FormGroup controlId={id} key={id}>
                          <ControlLabel>{label}</ControlLabel>

                          <FormControl
                            name={name}
                            type={type}
                            value={this.state.wasteProvider[name]}
                            placeholder={placeHolder}
                            onChange={this.handleWasteProviderChange}
                          />

                          {/* {help && <HelpBlock>{help}</HelpBlock>} */}
                        </FormGroup>
                      );
                    })}
                </Tab>
              </Tabs>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="info" onClick={this.handleFormSubmit}>
              {buttonText}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default UpdateCampaignModal;
