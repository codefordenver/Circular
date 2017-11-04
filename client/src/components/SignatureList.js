import React, { Component } from 'react';

class SignatureList extends Component {
  render() {
    return (
      <div className="sign-campaign-wrapper">
        <h2>Signatures</h2>
        <ul>
          {this.props.signatures &&
            this.props.signatures.map(({ id, name }) => <li key={id}>{name}</li>)}
        </ul>
      </div>
    );
  }
}

export default SignatureList;
