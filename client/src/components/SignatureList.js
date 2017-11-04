import React from 'react';
import {connect} from 'react-redux';

const SignatureList = (props) => {
  const { signature } = props;
  const signatures = signature && signature.signatures;

  return (
    <div className="sign-campaign-wrapper">
      <h2>Signatures</h2>
        <ul>
          {signatures && signatures.map(function(name, index){
            return <li key={ index }>{name}</li>;
          })}
        </ul>
    </div>
  )
};

export default connect(({signature}) => ({signature}))(SignatureList);