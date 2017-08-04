import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { selectAddress } from '../redux/actions/initialSearch';

class ChooseCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null
    };
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  // componentWillMount() {
  //   this.autoselectClosestCampaign(this.props);
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.nearbyCampaigns !== nextProps.nearbyCampaigns) {
  //     this.autoselectClosestCampaign(nextProps);
  //   }
  // }

  // autoselectClosestCampaign(props) {
  //   const { nearbyCampaigns } = props;
  //   if (nearbyCampaigns && Array.isArray(nearbyCampaigns)) {
  //     this.setState({ selectedOption: nearbyCampaigns[0].street_address });
  //   }
  // }

  handleOptionChange(e) {
    this.props.selectAddress(e.target.value);
  }

  handleFormSubmit(e) {
    e.stopPropagation();
    e.preventDefault();
    const { selectedAddress } = this.props;
    if (!selectedAddress || selectedAddress === 'no-match') {
      this.props.router.push('/new-campaign/address');
    }
  }

  renderNearbyCampaigns(nearbyCampaignsArr, selectedOption, handleOptionChange) {
    return (
      nearbyCampaignsArr.map(c => (
        <div className="radio" key={c.street_address}>
          <label>
            <input
              type="radio"
              value={c.street_address}
              checked={selectedOption && selectedOption.street_address === c.street_address}
              onChange={handleOptionChange}
            />
            { c.street_address }
          </label>
        </div>)
      )
    );
  }

  render() {
    const { selectedOption } = this.state;
    const { error, nearbyCampaigns, loading, loaded, selectedAddress } = this.props;

    return (
      <div className="temporary-results-box">
        { loading && <i className="fa fa-recycle fa-4x fa-spin" /> }
        { !loading && error && error.searchError && <p>{error.userMessage}</p> }
        { loaded && nearbyCampaigns && Array.isArray(nearbyCampaigns) &&
        <form>
          <p>{'We found these campaigns near you.'}</p>
          <p>{'Do any of these campaigns represent where you live?'}</p>
          {this.renderNearbyCampaigns(nearbyCampaigns, selectedAddress, this.handleOptionChange)}
          <div className="radio" key="no-match">
            <label>
              <input
                type="radio"
                value={'none'}
                checked={!selectedAddress}
                onChange={this.handleOptionChange}
              />
              { "None of these match my address. Let's start a new campaign." }
            </label>
          </div>
        </form>
        }
        { !loading && nearbyCampaigns && nearbyCampaigns.status === 'okay' && !nearbyCampaigns.results &&
        <p>{"We didn't find any campaigns near you. Would you like to start one?"}</p>
        }
        <button className="btn" type="submit" onClick={this.handleFormSubmit}>Next</button>
      </div>
    );
  }
}

export default connect(
  ({ initialSearch }) => ({ ...initialSearch }), { selectAddress })(withRouter(ChooseCampaign));
