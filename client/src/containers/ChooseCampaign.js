import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Grid, Row, Col, Button, ListGroup, ControlLabel, ListGroupItem } from 'react-bootstrap';
import { selectAddress } from '../redux/actions/initialSearch';
import fetchCampaignById from '../redux/actions/activeCampaign';
import AutoSuggestInput from '../components/AutoSuggestInput';

class ChooseCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null
    };
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleOptionChange(e) {
    this.props.selectAddress(e.target.value);
  }

  handleFormSubmit(e) {
    e.stopPropagation();
    e.preventDefault();
    const { selectedAddress } = this.props;
    if (selectedAddress === 'different') {
      this.props.router.push('/');
    } else if (!selectedAddress || selectedAddress === 'none') {
      this.props.router.push('/new-campaign/address');
    } else {
      this.props.fetchCampaignById(selectedAddress.id);
      this.props.router.push(`/campaign/${selectedAddress.id}`);
    }
  }

  noMatchAddress = {
    address: 'none',
    name: "None of these match my address. Let's start a new campaign."
  };

  buildNearbyCampaignList(nearbyCampaigns, selectedOption, includeNoMatch = false) {
    const campaignsArr = [...nearbyCampaigns];
    if (includeNoMatch) {
      campaignsArr.push(this.noMatchAddress);
    }

    const nearbyCampaignListItems = campaignsArr.map(c => {
      // if the noMatch item is selected, selectedOption is the string 'none' instead of an object
      let checked = selectedOption && selectedOption.address === c.address;
      if (typeof selectedOption === 'string') {
        checked = c.address === 'none';
      }
      const showAddress = c.address !== 'none';
      const checkedClass = checked ? 'fa-check-circle-o' : 'fa-circle-o';

      return (
        <Row>
          <ListGroupItem
            className="p-0 mx-0 rounded-0 bg-clear border-clear nearby-address-item"
            key={c.address}
          >
            <input
              type="radio"
              id={c.address}
              value={c.address}
              checked={checked}
              onChange={this.handleOptionChange}
            />
            <Col xs={12}>
              <ControlLabel bsStyle="remove-default" htmlFor={c.address}>
                {/* turn it into a flexbox */}
                <Row>
                  <Col xs={1}>
                    <i className={`fa ${checkedClass}`} />
                  </Col>
                  <Col xs={10} className="nearby-address-info mx-10">
                    {c.name ? <div>{c.name}</div> : ''}
                    {showAddress && c.address}
                  </Col>
                </Row>
              </ControlLabel>
            </Col>
          </ListGroupItem>
        </Row>
      );
    });

    return (
      <ListGroup className="list-group my-10 nearby-address-list">
        {nearbyCampaignListItems}
      </ListGroup>
    );
  }

  renderCampaignAlreadyExists = (nearbyCampaigns, selectedAddress) => (
    <div>
      <form>
        {this.renderAddressHeading('Your address already has a campaign.', 'Is this your address?')}
        {this.buildNearbyCampaignList(nearbyCampaigns, selectedAddress)}
        {this.renderSubmitButton('JOIN CAMPAIGN')}
        <Row>
          <Col xs={12} className="padding-box">
            <AutoSuggestInput />
          </Col>
        </Row>
      </form>
    </div>
  );
  renderNearbyCampaigns = (nearbyCampaigns, selectedAddress) => (
    <div>
      <form>
        {this.renderAddressHeading('We found some campaigns nearby!')}
        {this.buildNearbyCampaignList(
          nearbyCampaigns,
          selectedAddress,
          /* includeNoMatch = */ true
        )}
        {this.renderSubmitButton('JOIN CAMPAIGN')}
      </form>
    </div>
  );

  renderNewCampaign = () => (
    <div className="new-campaign">
      {this.renderAddressHeading(
        "You're the first to support recycling for your building!",
        "Launch your building's request for recycling! (We promise it will only take a minute)"
      )}
      {this.renderSubmitButton('CREATE CAMPAIGN')}
      <ul className="advantages">
        <li>
          <i className="fa fa-check" />
          Organize with fellow tenants
        </li>
        <li>
          <i className="fa fa-check" />
          Generate a petition
        </li>
        <li>
          <i className="fa fa-check" />
          Discover tools for approaching your landlord
        </li>
        <li>
          <i className="fa fa-check" />
          ...And more!
        </li>
      </ul>
    </div>
  );
  renderAddressHeading = (headingTitle, subTitle) => (
    <div className="py-15 text-center">
      <h1 className="new-address-heading py-15">{headingTitle}</h1>
      {subTitle && <h2 className="new-address-sub-heading py-15">{subTitle}</h2>}
    </div>
  );
  renderSubmitButton = submitText => (
    <Row>
      <Col xs={12}>
        <Button
          bsStyle="remove-default"
          className="join-campaign-button"
          type="submit"
          onClick={this.handleFormSubmit}
          block
        >
          {submitText} <i className="fa fa-arrow-right" />
        </Button>
      </Col>
    </Row>
  );
  renderLoading = () => (
    <div className="loader">
      <h1 className="loading-header">Searching for nearby campaigns...</h1>
      <i className="fa fa-recycle fa-4x slow-spin loading-spinner" />
    </div>
  );
  /* eslint-disable consistent-return */
  renderError = error => {
    /* eslint-enable */
    if (error && error.searchError) {
      return (
        <div>
          <p>{error.userMessage}</p>
        </div>
      );
    }
  };

  render() {
    const {
      loading,
      loaded,
      nearbyCampaigns,
      selectedAddress,
      searchedAddress,
      error
    } = this.props;

    return (
      <Grid fluid>
        <Row>
          <Col
            xs={10}
            xsOffset={1}
            sm={6}
            smOffset={3}
            md={4}
            mdOffset={4}
            className="p-0 text-white"
          >
            {loading && this.renderLoading()}
            {!loading && error && this.renderError(error)}
            {/* if no longer loading and not erroring then
            render one of the following three depending
             on the status of nearby campaign */}
            {loaded &&
              nearbyCampaigns &&
              nearbyCampaigns.length !== 0 &&
              nearbyCampaigns[0].address === searchedAddress.formatted_address &&
              this.renderCampaignAlreadyExists(nearbyCampaigns, selectedAddress)}
            {loaded &&
              nearbyCampaigns &&
              nearbyCampaigns.length !== 0 &&
              nearbyCampaigns[0].address !== searchedAddress.formatted_address &&
              this.renderNearbyCampaigns(nearbyCampaigns, selectedAddress)}
            {!loading &&
              nearbyCampaigns &&
              nearbyCampaigns.length === 0 &&
              this.renderNewCampaign()}
          </Col>
        </Row>
      </Grid>
    );
  }
}

ChooseCampaign.defaultProps = {
  error: null
};

ChooseCampaign.propTypes = {
  selectAddress: PropTypes.func.isRequired,
  error: PropTypes.objectOf(PropTypes.any),
  nearbyCampaigns: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  searchedAddress: PropTypes.objectOf(PropTypes.any).isRequired,
  selectedAddress: PropTypes.string.isRequired,
  fetchCampaignById: PropTypes.func.isRequired,
  router: PropTypes.objectOf(PropTypes.any).isRequired
};

export default connect(({ initialSearch }) => ({ ...initialSearch }), {
  selectAddress,
  fetchCampaignById
})(withRouter(ChooseCampaign));
