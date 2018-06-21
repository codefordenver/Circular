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
import { fetchWasteProviders } from '../redux/actions/firebaseWasteProviders';

const WASTE_PROVIDER_NOT_SET_ID = 'WASTE_PROVIDER_NOT_SET_ID';

class CreateCampaignStep2 extends React.Component {
  constructor(props) {
    super(props);

    this.defaultProvider = {
      _id: WASTE_PROVIDER_NOT_SET_ID,
      name: 'Select your provider(Optional)',
      phone: '',
      email: ''
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
              {stateNames.map(state => {
                const { abbr, name } = state;
                return (
                  <option key={abbr} value={abbr}>
                    {name}
                  </option>
                );
              })}
            </FormControl>
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

const stateNames = [
  { name: 'Alabama', abbr: 'AL' },
  { name: 'Alaska', abbr: 'AK' },
  { name: 'Arizona', abbr: 'AZ' },
  { name: 'Arkansas', abbr: 'AR' },
  { name: 'California', abbr: 'CA' },
  { name: 'Colorado', abbr: 'CO' },
  { name: 'Connecticut', abbr: 'CT' },
  { name: 'Delaware', abbr: 'DE' },
  { name: 'District of Columbia', abbr: 'DC' },
  { name: 'Florida', abbr: 'FL' },
  { name: 'Georgia', abbr: 'GA' },
  { name: 'Hawaii', abbr: 'HI' },
  { name: 'Idaho', abbr: 'ID' },
  { name: 'Illinois', abbr: 'IL' },
  { name: 'Indiana', abbr: 'IN' },
  { name: 'Iowa', abbr: 'IA' },
  { name: 'Kansas', abbr: 'KS' },
  { name: 'Kentucky', abbr: 'KY' },
  { name: 'Louisiana', abbr: 'LA' },
  { name: 'Maine', abbr: 'ME' },
  { name: 'Maryland', abbr: 'MD' },
  { name: 'Massachusetts', abbr: 'MA' },
  { name: 'Michigan', abbr: 'MI' },
  { name: 'Minnesota', abbr: 'MN' },
  { name: 'Mississippi', abbr: 'MS' },
  { name: 'Missouri', abbr: 'MO' },
  { name: 'Montana', abbr: 'MT' },
  { name: 'Nebraska', abbr: 'NE' },
  { name: 'Nevada', abbr: 'NV' },
  { name: 'New Hampshire', abbr: 'NH' },
  { name: 'New Jersey', abbr: 'NJ' },
  { name: 'New Mexico', abbr: 'NM' },
  { name: 'New York', abbr: 'NY' },
  { name: 'North Carolina', abbr: 'NC' },
  { name: 'North Dakota', abbr: 'ND' },
  { name: 'Ohio', abbr: 'OH' },
  { name: 'Oklahoma', abbr: 'OK' },
  { name: 'Oregon', abbr: 'OR' },
  { name: 'Pennsylvania', abbr: 'PA' },
  { name: 'Rhode Island', abbr: 'RI' },
  { name: 'South Carolina', abbr: 'SC' },
  { name: 'South Dakota', abbr: 'SD' },
  { name: 'Tennessee', abbr: 'TN' },
  { name: 'Texas', abbr: 'TX' },
  { name: 'Utah', abbr: 'UT' },
  { name: 'Vermont', abbr: 'VT' },
  { name: 'Virginia', abbr: 'VA' },
  { name: 'Washington', abbr: 'WA' },
  { name: 'West Virginia', abbr: 'WV' },
  { name: 'Wisconsin', abbr: 'WI' },
  { name: 'Wyoming', abbr: 'WY' }
];

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
