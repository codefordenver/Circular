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

const WASTE_PROVIDER_NOT_SET_ID = 'WASTE_PROVIDER_NOT_SET_ID';

class CreateCampaignStep2 extends React.Component {
  constructor(props) {
    super(props);

    this.defaultProvider = {
      _id: WASTE_PROVIDER_NOT_SET_ID,
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
      _wasteProviderId: undefined,
      buildingInfo: {
        numBuildings: e.target.buildingCount.value,
        numUnits: e.target.unitCount.value
      }
    };
    const wasteProviderId = e.target.wasteMgmtName.options[e.target.wasteMgmtName.selectedIndex].id;
    if (wasteProviderId !== WASTE_PROVIDER_NOT_SET_ID) {
      updateCampainInfo._wasteProviderId = wasteProviderId;
    }
    await this.props.updateNewCampaign(updateCampainInfo);

    this.props.router.push('/new-campaign/activate');
  };

  handleWasteMgmtChange = async e => {
    const wasteMgmtId = e.target.options[e.target.selectedIndex].id;
    let activeProvider = this.defaultProvider;
    if (wasteMgmtId !== WASTE_PROVIDER_NOT_SET_ID) {
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
              <option value="" selected="selected" />
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
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
            <FormControl type="Number" name="buildingCount" placeholder={0} />
          </Col>
          <Col xs={10}>BUILDING(S)</Col>
          <Col xs={12}>
            <ControlLabel>THIS BUILDING HAS APPROXIMATELY:</ControlLabel>
          </Col>
          <Col xs={2}>
            <FormControl type="number" name="unitCount" placeholder={0} />
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
    wasteProviders: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.objectOf(PropTypes.any)
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
