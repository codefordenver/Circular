import { connect } from 'react-redux';
import CreateNewCampaign from '../components/CreateCampaignSteps/CreateCampaign';
import { firebaseCreateNewCampaign } from '../redux/actions/firebaseCampaigns';

export default connect(
  ({ activeCampaign, auth, firebaseInitialSearch }) => ({
    activeCampaign,
    auth,
    firebaseInitialSearch
  }),
  {
    firebaseCreateNewCampaign
  }
)(CreateNewCampaign);
