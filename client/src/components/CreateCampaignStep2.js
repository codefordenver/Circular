/* eslint-disable react/prop-types, no-shadow */ /* - TODO: Fix and remove this line */
import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router";
import PropTypes from "prop-types";
import {
  Col,
  PageHeader,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from "react-bootstrap";
import stateNames from "../components/CreateCampaignSteps/stateNames";
import { updateNewCampaign } from "../redux/actions/newCampaign";
import { firebaseFetchWasteProviders } from "../redux/actions/firebaseWasteProviders";

const WASTE_PROVIDER_NOT_SET_ID = "WASTE_PROVIDER_NOT_SET_ID";

class CreateCampaignStep2 extends React.Component {
  constructor(props) {
    super(props);

    this.defaultProvider = {
      id: WASTE_PROVIDER_NOT_SET_ID,
      name: "Select your provider(Optional)",
      phone: "",
      email: ""
    };
    this.state = {
      activeProvider: this.defaultProvider
    };
  }

  // TODO MOVES THIS TO CONTAINER TO PREVENT RELOAD OF DATA ON SELECTION OF WASTE PROVIDER
  componentDidMount() {
    this.props.firebaseFetchWasteProviders();
  }

  setOptionalInfo = async e => {
    e.preventDefault();
    const {
      target: { name, email, phone, address, buildingCount, unitCount }
    } = e;

    const updateCampainInfo = {
      propertyManager: {
        name: name.value,
        address: address.value,
        phone: phone.value,
        email: email.value
      },
      _wasteProviderId: undefined,
      buildingInfo: {
        numBuildings: buildingCount.value,
        numUnits: unitCount.value
      }
    };
    const wasteProviderId = e.target.wasteMgmtName.options[e.target.wasteMgmtName.selectedIndex].id;
    if (wasteProviderId !== WASTE_PROVIDER_NOT_SET_ID) {
      updateCampainInfo._wasteProviderId = wasteProviderId;
    }
    await this.props.updateNewCampaign(updateCampainInfo);

    this.props.router.push("/new-campaign/activate");
  };

  handleWasteMgmtChange = async e => {
    const wasteMgmtId = e.target.options[e.target.selectedIndex].id;
    let activeProvider = this.defaultProvider;
    if (wasteMgmtId !== WASTE_PROVIDER_NOT_SET_ID) {
      activeProvider = this.props.firebaseWasteProviders.wasteProviders.find(
        provider => provider.id === wasteMgmtId
      );
    }

    this.setState({ activeProvider });
  };

  renderWasteProviderOptions = wasteProviders =>
    wasteProviders.map(provider => (
      <option key={provider.id} id={provider.id}>
        {provider.name}
      </option>
    ));
  render() {
    let {
      firebaseWasteProviders: { wasteProviders }
    } = this.props;
    const { loaded } = this.props.firebaseWasteProviders;
    wasteProviders = [this.defaultProvider, ...(wasteProviders || [])];
    return (
      <Form onSubmit={this.setOptionalInfo} horizontal className="create-campaign-form">
        <PageHeader>OPTIONAL INFO</PageHeader>
        <FormGroup>
          <h2>Property Manager or Company:</h2>
          <Col xs={12}>
            <ControlLabel>NAME</ControlLabel>
            <FormControl type="text" name="name" />

            <ControlLabel>PHONE</ControlLabel>
            <FormControl type="tel" name="phone" />
            <ControlLabel>EMAIL</ControlLabel>
            <FormControl type="email" name="email" />
            <ControlLabel>ADDRESS</ControlLabel>
            <FormControl type="text" name="address" />
          </Col>
          <Col xs={6}>
            <ControlLabel>CITY</ControlLabel>
            <FormControl type="text" name="city" />
          </Col>
          <Col xs={3}>
            <ControlLabel>STATE</ControlLabel>
            {loaded && (
              <FormControl componentClass="select" name="state">
                <option value="state" />
                {/* // TODO build sort function or return from firestore sorted */}
                {stateNames.map(state => {
                  const { abbr, name } = state;
                  return (
                    <option key={abbr} value={abbr}>
                      {name}
                    </option>
                  );
                })}
              </FormControl>
            )}
          </Col>
          <Col xs={3}>
            <ControlLabel>ZIP</ControlLabel>
            <FormControl
              type="text"
              name="zip"
              pattern="[0-9]{5}"
              title="Must be a 5-digit zip code"
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <h2>Waste Collection Provider:</h2>
          <Col xs={12}>
            <ControlLabel>CURRENT PROVIDER</ControlLabel>
            <FormControl
              componentClass="select"
              name="wasteMgmtName"
              onChange={this.handleWasteMgmtChange}
            >
              {this.renderWasteProviderOptions(wasteProviders)}
            </FormControl>
            <ControlLabel>PHONE</ControlLabel>
            <FormControl
              className="readonly"
              type="tel"
              name="wasteMgmtPhone"
              value={this.state.activeProvider.phone}
              readOnly
            />
            <ControlLabel>EMAIL</ControlLabel>
            <FormControl
              className="readonly"
              type="email"
              name="wasteMgmtEmail"
              value={this.state.activeProvider.email}
              readOnly
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <h2>Building Info:</h2>
          <Col xs={12}>
            <ControlLabel>THIS PROPERTY CONSISTS OF:</ControlLabel>
          </Col>
          <Col xs={2}>
            <FormControl type="Number" min="0" max="100" name="buildingCount" placeholder={0} />
          </Col>
          <Col xs={10}>BUILDING(S)</Col>
          <Col xs={12}>
            <ControlLabel>THIS BUILDING HAS APPROXIMATELY:</ControlLabel>
          </Col>
          <Col xs={2}>
            <FormControl type="number" min="0" max="500" name="unitCount" placeholder={0} />
          </Col>
          <Col xs={10}>TOTAL UNITS</Col>
        </FormGroup>
        <FormGroup>
          <Col xs={12}>
            <Link to="/new-campaign/address" className="btn next-button fl">
              Back
            </Link>
            <Button bsStyle="remove-default" className="next-button fr" type="submit">
              Next
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

CreateCampaignStep2.propTypes = {
  updateNewCampaign: PropTypes.func.isRequired,
  firebaseFetchWasteProviders: PropTypes.func.isRequired,
  firebaseWasteProviders: PropTypes.arrayOf({
    loaded: PropTypes.bool.isRequired,
    wasteProviders: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired
    }),
    error: PropTypes.objectOf(PropTypes.any)
  }).isRequired
};

export default connect(
  ({ initialSearch, firebaseWasteProviders }) => ({
    initialSearch,
    firebaseWasteProviders
  }),
  {
    updateNewCampaign,
    firebaseFetchWasteProviders
  }
)(withRouter(CreateCampaignStep2));
