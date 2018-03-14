/* eslint-disable react/prop-types, no-shadow */ /* - TODO: Fix and remove this line */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import PropTypes from 'prop-types';
import {
  Col,
  PageHeader,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from 'react-bootstrap';
import { updateNewCampaign } from '../redux/actions/newCampaign';
import { fetchWasteProviders } from '../redux/actions/wasteProvider';

class CreateCampaignStep2 extends React.Component {
  constructor(props) {
    super(props);

    this.defaultProvider = {
      _id: 'default',
      name: 'Select your provider(Optional)',
      phone: 'N/A',
      email: 'N/A'
    };
    this.state = {
      activeProvider: this.defaultProvider
    };
  }

  componentDidMount() {
    this.props.fetchWasteProviders();
  }

  setOptionalInfo = async e => {
    e.preventDefault();

    const updateCampainInfo = {
      propertyManager: {
        name: e.target.name.value,
        address: e.target.address.value,
        phone: e.target.phone.value,
        email: e.target.email.value
      },
      buildingInfo: {
        numBuildings: e.target.buildingCount.value,
        numUnits: e.target.unitCount.value
      }
    };
    const wasteProviderId = e.target.wasteMgmtName.options[e.target.wasteMgmtName.selectedIndex].id;
    if (wasteProviderId) {
      updateNewCampaign._wasteProviderId = wasteProviderId;
    }
    await this.props.updateNewCampaign(updateCampainInfo);

    // this.props.router.push('/new-campaign/activate');
  };

  handleWasteMgmtChange = async e => {
    const wasteMgmtId = e.target.options[e.target.selectedIndex].id;
    let activeProvider = this.defaultProvider;
    if (wasteMgmtId !== this.defaultProvider._id) {
      activeProvider = this.props.wasteProvider.wasteProviders.find(
        provider => provider._id === wasteMgmtId
      );
    }

    this.setState({ activeProvider });
  };

  renderWasteProviderOptions = wasteProviders =>
    wasteProviders.map(provider => (
      <option key={provider._id} id={provider._id}>
        {provider.name}
      </option>
    ));
  render() {
    let { wasteProvider: { wasteProviders } } = this.props;
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
            <FormControl componentClass="select" name="state">
              {/*
              ADD IN STATES
              */}
              <option value="CO">CO</option>
            </FormControl>
          </Col>
          <Col xs={3}>
            <ControlLabel>ZIP</ControlLabel>
            <FormControl type="number" name="zip" />
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
            <FormControl type="Number" name="buildingCount" />
          </Col>
          <Col xs={10}>BUILDING(S)</Col>
          <Col xs={12}>
            <ControlLabel>THIS BUILDING HAS APPROXIMATELY:</ControlLabel>
          </Col>
          <Col xs={2}>
            <FormControl type="number" name="unitCount" />
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
  fetchWasteProviders: PropTypes.func.isRequired,
  wasteProvider: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired,
    wasteProviders: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.objectOf(PropTypes.any),
    activeProvider: PropTypes.object
  }).isRequired
};

export default connect(
  ({ initialSearch, wasteProvider }) => ({
    initialSearch,
    wasteProvider
  }),
  {
    updateNewCampaign,
    fetchWasteProviders
  }
)(withRouter(CreateCampaignStep2));
