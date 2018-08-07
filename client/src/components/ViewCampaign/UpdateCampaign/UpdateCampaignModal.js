import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ControlLabel,
  // HelpBlock,
  FormControl,
  FormGroup,
  Panel,
  Modal,
  Tab,
  Tabs
} from 'react-bootstrap';
import UpdateWasteProvider from './UpdateWasteProvider';

class UpdateCampaignModal extends Component {
  constructor(props) {
    super(props);
    const { buildingInformation, propertyManager, wasteProvider } = props.activeCampaign;
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
    (() =>
      this.setState(prevState => ({
        ...prevState,
        propertyManager: {
          ...prevState.propertyManager,
          [name]: value
        }
      })))();
  };

  handleWasteProviderChange = e => {
    const { options } = e.target;
    const { selectedIndex } = options;
    const selectedWasteProviderId = options[selectedIndex].id;
    const selectedWasteProviderData = this.props.firebaseWasteProviders.wasteProviders.find(
      provider => provider.id === selectedWasteProviderId
    );
    (() =>
      this.setState(prevState => ({
        ...prevState,
        wasteProvider: {
          ...prevState.wasteProvider,
          ...selectedWasteProviderData
        }
      })))();
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
      firebaseWasteProviders
    } = this.props;
    return (
      <div>
        <Modal keyboard show={show} onHide={onHide}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: 'black' }}>Update details for {address}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="update-campaign-modal-body" style={{ color: 'black' }}>
            <form>
              <Tabs
                activeKey={this.state.key}
                onSelect={this.handleTabSwitch}
                id="updateCampaignModalForm"
              >
                <Tab style={{ marginTop: '1em' }} eventKey={1} title="Building">
                  {this.state.buildingInformation &&
                    buildingInformation.map(info => {
                      const { id, label, placeHolder, type, name } = info;
                      return (
                        <FormGroup controlId={id} key={id}>
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
                <Tab style={{ marginTop: '1em' }} eventKey={2} title="Property Manager">
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
                <Tab style={{ marginTop: '1em' }} eventKey={3} title="Waste Provider">
                  {activeCampaign &&
                  activeCampaign.wasteProvider &&
                  activeCampaign.wasteProvider.id ? (
                    <div>
                      <Panel>
                        <Panel.Heading>
                          <Panel.Title componentClass="h3">Current Waste Provider</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                          <h5>{`Name:    ${activeCampaign.wasteProvider.name || ''}`}</h5>
                          <h5>{`Email:   ${activeCampaign.wasteProvider.email || ''}`}</h5>
                          <h5>{`Phone:   ${activeCampaign.wasteProvider.phone || ''}`}</h5>
                          <h5>{`Address: ${activeCampaign.wasteProvider.address || ''}`}</h5>
                        </Panel.Body>
                      </Panel>
                      <UpdateWasteProvider
                        handleWasteProviderChange={this.handleWasteProviderChange}
                        wasteProviders={firebaseWasteProviders.wasteProviders}
                      />
                    </div>
                  ) : (
                    <UpdateWasteProvider
                      handleWasteProviderChange={this.handleWasteProviderChange}
                      wasteProviders={firebaseWasteProviders.wasteProviders}
                    />
                  )}
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

UpdateCampaignModal.defaultProps = {
  firebaseWasteProviders: [
    {
      email: '',
      id: '',
      name: '',
      phone: ''
    }
  ],
  wasteProviders: []
};

UpdateCampaignModal.propTypes = {
  activeCampaign: PropTypes.shape({}).isRequired,
  buildingInformation: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      placeHolder: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  buttonText: PropTypes.string.isRequired,
  firebaseWasteProviders: PropTypes.shape({
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    wasteProviders: PropTypes.arrayOf(
      PropTypes.shape({
        email: PropTypes.string,
        id: PropTypes.string,
        name: PropTypes.string,
        phone: PropTypes.string
      })
    )
  }),
  handleUpdateCampaign: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  propertyManager: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      placeHolder: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  show: PropTypes.bool.isRequired,
  toggleShowUpdateCampaignModal: PropTypes.func.isRequired,
  wasteProviders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      placeHolder: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired
};

export default UpdateCampaignModal;
