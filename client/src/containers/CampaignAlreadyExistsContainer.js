import { connect } from 'react-redux';
import CampaignAlreadyExists from '../components/ChooseCampaign/CampaignAlreadyExists';

export default connect(({ firebaseInitialSearch }) => ({
  exactMatch: firebaseInitialSearch && firebaseInitialSearch.exactMatch
}))(CampaignAlreadyExists);
