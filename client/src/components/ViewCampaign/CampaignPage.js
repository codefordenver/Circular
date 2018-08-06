import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, Button } from "react-bootstrap";
import { FacebookShareButton, TwitterShareButton } from "react-share";
// COMPONENTS
import CampaignProgressBar from "./CampaignProgressBar";
import CampaignStatus from "./CampaignStatus";
import CollapsePanel from "../UtilComponents/CollapsePanel";
import Discussion from "../Discussion";
import NewCampaignWelcomeModal from "./NewCampaignWelcomeModal";
import MapCard from "../MapCard";
import SignCampaign from "./SignCampaign/SignCampaign";
import SignatureList from "./SignCampaign/SignatureList";
// FUNCTIONS
import { calculateCampaignDuration } from "../../utils/calculateCampaignDuration";

const CampaignPage = ({
  activeCampaign,
  activeCampaign: { address, activeCampaignSignatures, campaignId, loaded },
  hrefIsLocalhost,
  handleChangeIsNewCampaign,
  isNewCampaign,
  signCampaignProps
}) => (
  <Grid>
    <Row className="full-height-side-bar">
      <Col md={9} xs={12} className="campaign-wrapper">
        <Row className="show-grid top">
          <Col md={6} xs={12} className="center-block">
            <div className="map-wrapper">
              {activeCampaign &&
                address && <MapCard activeCampaign={activeCampaign} />}
            </div>
          </Col>
          <Col className="center-block" md={6} xs={12}>
            <Row>
              <NewCampaignWelcomeModal
                onHide={handleChangeIsNewCampaign}
                show={isNewCampaign}
              />
              <Col className="status-bar" xs={12}>
                {activeCampaign &&
                  activeCampaign.createdAt && (
                    <Row className="show-grid top">
                      <CampaignProgressBar
                        createdAt={activeCampaign.createdAt}
                        phases={[
                          "Campaign Created",
                          "Print Flyers",
                          "Final Signatures",
                          "Request Recycling"
                        ]}
                        duration={calculateCampaignDuration(
                          activeCampaign.createdAt
                        )}
                      />
                    </Row>
                  )}
              </Col>
            </Row>
            <Row className="top share-campaign-row">
              <Col md={12} xs={12} className="text-center">
                <p className="vcenter">Share Your Campaign</p>
              </Col>
              <Col md={12} xs={12}>
                <div className="share-buttons">
                  <Col md={6} xs={6} className="share-bar">
                    <FacebookShareButton
                      quote="Support my recycling request!"
                      /*
                                              facebook url errors on localhost, it has to be able to
                                              connect to something.  so if its on dev link it to the heroku page.
                                              */
                      url={
                        hrefIsLocalhost
                          ? `https://denver-reimagine.herokuapp.com/campaign/${campaignId}`
                          : window.location.href
                      }
                    >
                      <Button
                        bsStyle="remove-default"
                        className="btn btn-facebook"
                        block
                      >
                        <i className="fa fa-facebook-square " />Facebook
                      </Button>
                    </FacebookShareButton>
                  </Col>
                  <Col md={6} xs={6} className="share-bar">
                    <TwitterShareButton
                      url={window.location.href}
                      title="Support my recycling request!"
                      via="EcoCycle"
                      hashtags={["ZeroWasteDenver", "Recycle"]}
                    >
                      <Button
                        bsStyle="remove-default"
                        className="btn btn-twitter"
                        block
                      >
                        <i className="fa fa-twitter-square" />Tweet
                      </Button>
                    </TwitterShareButton>
                  </Col>
                  <Col md={12} xs={12} className="share-bar">
                    <a
                      className="btn btn-flyer btn-block"
                      href={`${process.env.PUBLIC_URL}/flyer.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-download" /> Download Flyer
                    </a>
                  </Col>
                </div>
              </Col>
            </Row>
            <Row className="show-grid">
              <Col className="status-bar" xs={12}>
                {activeCampaign &&
                  activeCampaign.createdAt && (
                    <CampaignStatus
                      createdAt={activeCampaign.createdAt}
                      duration={calculateCampaignDuration(
                        activeCampaign.createdAt
                      )}
                    />
                  )}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="show-grid top">
          <Col md={12} xs={12}>
            <Discussion campaignID={campaignId} />
          </Col>
        </Row>
      </Col>
      <Col md={3} xs={12} className="side-bar">
        {
          <div>
            <SignCampaign signCampaignProps={signCampaignProps} />
            <div className="text-center sig-bar-collapse-panel">
              {activeCampaign &&
                loaded &&
                activeCampaignSignatures && (
                  <CollapsePanel
                    defaultExpanded
                    titleText="See Who's Signed"
                    body={
                      <SignatureList
                        activeCampaignSignatures={activeCampaignSignatures.map(
                          signature => signature.displayName
                        )}
                      />
                    }
                  />
                )}
            </div>
          </div>
        }
      </Col>
    </Row>
  </Grid>
);

MapCard.defaultProps = {
  activeCampaign: PropTypes.shape({
    error: null
  })
};

CampaignPage.propTypes = {
  activeCampaign: PropTypes.shape({
    activeCampaignSigantures: PropTypes.arrayOf(),
    address: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
    error: PropTypes.string,
    isNewCampaign: PropTypes.bool,
    latLng: PropTypes.shape({
      _lat: PropTypes.number.isRequired,
      _long: PropTypes.number.isRequired
    }),
    loaded: PropTypes.bool,
    loading: PropTypes.bool,
    modifiedAt: PropTypes.instanceOf(Date)
  }).isRequired,
  handleChangeIsNewCampaign: PropTypes.func.isRequired,
  hrefIsLocalhost: PropTypes.bool.isRequired,
  isNewCampaign: PropTypes.bool.isRequired,
  signCampaignProps: PropTypes.shape({
    auth: PropTypes.shape({}).isRequired,
    activeCampaign: PropTypes.shape({
      address: PropTypes.string,
      modifiedAt: PropTypes.instanceOf(Date).isRequired,
      createdAt: PropTypes.instanceOf(Date).isRequired,
      latLng: PropTypes.shape({
        _lat: PropTypes.number.isRequired,
        _long: PropTypes.number.isRequired
      }),
      error: PropTypes.string,
      loading: PropTypes.bool,
      loaded: PropTypes.bool
    }).isRequired,
    firebaseAddSignatureToCampaign: PropTypes.func.isRequired,
    firebaseRemoveSignatureFromCampaign: PropTypes.func.isRequired,
    firebaseSignInGoogle: PropTypes.func.isRequired,
    firebaseSignInFacebook: PropTypes.func.isRequired,
    firebaseUpdateCampaign: PropTypes.func.isRequired
  }).isRequired
};

export default CampaignPage;
