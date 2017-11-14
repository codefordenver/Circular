import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SignatureList extends Component {
  constructor(props) {
    super(props);

    this.state = { areSignaturesExpanded: false };
    this.toggleSignatures = this.toggleSignatures.bind(this);
  }

  toggleSignatures(e) {
    e.preventDefault();
    this.setState(prevState => ({
      areSignaturesExpanded: !prevState.areSignaturesExpanded
    }));
  }

  render() {
    const { signatures } = this.props;
    return (
      <div className="signature-wrapper">
        <ul>{signatures && signatures.map(({ id, name }) => <li key={id}>{name}</li>)}</ul>
      </div>
    );
  }
}

SignatureList.defaultProps = {
  signatures: []
};

SignatureList.propTypes = {
  signatures: PropTypes.arrayOf(PropTypes.object)
};

export default SignatureList;
