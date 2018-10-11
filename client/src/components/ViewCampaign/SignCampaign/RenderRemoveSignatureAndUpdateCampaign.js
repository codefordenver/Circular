import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Alert, Button } from 'react-bootstrap';
import ToolList from '../../UtilComponents/CollapsePanel';

const RenderRemoveSignatureAndUpdateCampaign = ({
  handleRemoveSignatureFromCamapaign,
  toggleShowUpdateCampaignModal,
  userIsAdmin
}) => (
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
        <Button
          className="logout-button-signature"
          onClick={handleRemoveSignatureFromCamapaign}
          block
        >
          <i className="fa fa-times-circle" />
          Unsign This Campaign
        </Button>
        {userIsAdmin && (
          <Button
            style={{ marginTop: '1em' }}
            bsStyle="info"
            block
            onClick={toggleShowUpdateCampaignModal}
          >
            Update Campaign Info
          </Button>
        )}
      </div>
    </div>
  </div>
);

RenderRemoveSignatureAndUpdateCampaign.propTypes = {
  handleRemoveSignatureFromCamapaign: PropTypes.func.isRequired,
  toggleShowUpdateCampaignModal: PropTypes.func.isRequired,
  userIsAdmin: PropTypes.bool.isRequired
};

export default RenderRemoveSignatureAndUpdateCampaign;
