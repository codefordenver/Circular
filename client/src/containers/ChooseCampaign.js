import React, { Component } from 'react';
import { connect } from 'react-redux';

class ChooseCampaign extends Component {
  renderNearbyCampaigns(nearbyCampaignsArr) {
    return (
      <ul>
        {nearbyCampaignsArr.map(c => <li><p>{ c.street_address }</p></li>)}
      </ul>
    );
  }

  render() {
    const renderNearby = this.renderNearbyCampaigns;
    const { error, nearbyCampaigns, loading, loaded } = this.props.initialSearch;
    return (
      <div className="temporary-results-box">
        { loading && <p> Searching... </p> }
        { !loading && error && error.searchError && <p>{error.userMessage}</p> }
        { loaded && nearbyCampaigns && Array.isArray(nearbyCampaigns) &&
        <div>
          <p>{"Here's some nearby campaigns:"}</p>
          {renderNearby(nearbyCampaigns)}
        </div>
        }
        { !loading && nearbyCampaigns && nearbyCampaigns.status === 'okay' && !nearbyCampaigns.results &&
        <p>{"We didn't find any campaigns near you. Would you like to start one?"}</p>
        }
      </div>
    );
  }
}

export default connect(
  ({ initialSearch }) => ({ initialSearch }))(ChooseCampaign);
