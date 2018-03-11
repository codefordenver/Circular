/* eslint-disable react/prop-types, no-shadow */ /* - TODO: Fix and remove this line */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
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

const CreateCampaignStep2 = props => {
  const { updateNewCampaign, router } = props;

  const setOptionalInfo = async e => {
    e.preventDefault();

    await updateNewCampaign({
      propertyManager: {
        name: e.target.name.value,
        address: e.target.address.value,
        phone: e.target.phone.value,
        email: e.target.email.value
      },
      wasteProvider: {
        name: e.target.wasteMgmtName.value,
        phone: e.target.wasteMgmtPhone.value,
        email: e.target.wasteMgmtEmail.value
      },
      unitCount: e.target.unitCount.value
    });

    router.push('/new-campaign/activate');
  };
  const getInfoFromStateBasedOnWasteProviderSelected = wasteProvider => {
    console.log('WASTE PROVIDER LOGIC TODO');
    return '';
  };

  return (
    <Form onSubmit={setOptionalInfo} horizontal className="create-campaign-form">
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
            {/*
              ADD IN STATES
          */}
            <option value="CO">CO</option>
          </FormControl>
        </Col>
        <Col xs={3}>
          <ControlLabel>ZIP</ControlLabel>
          <FormControl type="number" name="zip" />
        </Col>
      </FormGroup>

      <FormGroup>
        <h2>Waste Collection Provider:</h2>
        <Col xs={12}>
          <ControlLabel>CURRENT PROVIDER</ControlLabel>
          <FormControl componentClass="select" name="wasteMgmtName">
            <option value="Matt's #1 Trash King">Matt's #1 Trash King</option>
          </FormControl>
          <ControlLabel>PHONE</ControlLabel>
          <FormControl
            type="tel"
            name="wasteMgmtPhone"
            value={getInfoFromStateBasedOnWasteProviderSelected()}
            readOnly
          />
          <ControlLabel>EMAIL</ControlLabel>
          <FormControl
            type="email"
            name="wasteMgmtEmail"
            value={getInfoFromStateBasedOnWasteProviderSelected()}
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
          <FormControl type="Number" name="buildingCount" />
        </Col>
        <Col xs={10}>BUILDING(S)</Col>
        <Col xs={12}>
          <ControlLabel>THIS BUILDING HAS APPROXIMATELY:</ControlLabel>
        </Col>
        <Col xs={2}>
          <FormControl type="number" name="unitCount" />
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
};

export default connect(({ initialSearch }) => ({ initialSearch }), {
  updateNewCampaign
})(CreateCampaignStep2);
