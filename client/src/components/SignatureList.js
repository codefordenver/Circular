import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCampaignSignatures } from '../redux/actions/signature';

class SignatureList extends React.Component {
  componentDidMount() {
    this.props.fetchCampaignSignatures(this.props.campaignID);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.campaignID !== nextProps.campaignID) {
      nextProps.fetchCampaignSignatures(nextProps.campaignID);
    }
  }

  render() {
    const { signatures } = this.props;
    return (
      <div>
        {signatures.length ? (
          <h2>
            ({signatures.length}) Signature{signatures.length > 1 ? 's' : ''} on the list!
          </h2>
        ) : (
          <h2>Be the First!</h2>
        )}
        <ul>{signatures && signatures.map(({ id, name }) => <li key={id}>{name}</li>)}</ul>
      </div>
    );
  }
}

SignatureList.defaultProps = {
  signatures: []
};

SignatureList.propTypes = {
  campaignID: PropTypes.string.isRequired,
  signatures: PropTypes.arrayOf(PropTypes.object),
  fetchCampaignSignatures: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  signatures: state.signature.signatures
});

export default connect(mapStateToProps, { fetchCampaignSignatures })(SignatureList);
