import React from 'react';
import { Link } from 'react-router';
import { Alert, Button } from 'react-bootstrap';
import ToolList from '../../UtilComponents/CollapsePanel';

const RenderRemoveSignature = () => (
  <div>
    <div className="text-center thanks-for-alert">
      <Alert bsStyle="success">
        <h4>Thanks for Signing!</h4>
      </Alert>
      <ToolList
        headingStyle="bg-blue-color text-center"
        titleText="Helpful tools:"
        defaultExpanded
        body={
          <ul className="tool-list-body">
            <li>
              <Link className="toolList" to="/tips-for-requesting">
                Tips for Approaching your Landlord
              </Link>
            </li>
            <li>
              <Link className="toolList" to="/denver-learn-more">
                Denver Recycling Facts
              </Link>
            </li>
          </ul>
        }
      />
      <div className="text-center">
        <Button className="logout-button-signature" block>
          <i className="fa fa-times-circle" />
          Unsign This Campaign
        </Button>
      </div>
    </div>
  </div>
);

export default RenderRemoveSignature;
