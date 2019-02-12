import { connect } from 'react-redux';
import NewCampaign from '../components/ChooseCampaign/NewCampaign';
import { firebaseCreateNewCampaign } from '../redux/actions/firebaseCampaigns';

export default connect(
  ({ auth, firebaseCampaigns, firebaseInitialSearch }) => ({
    auth,
    firebaseCampaigns,
    firebaseInitialSearch
  }),
  {
    firebaseCreateNewCampaign
  }
)(NewCampaign);
