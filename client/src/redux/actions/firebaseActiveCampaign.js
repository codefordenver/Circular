import { campaignsRef } from '../../firebase';

// find campaign by ID request
export const fetchCampaignByIdRequest = () => ({
  type: 'FETCH_CAMPAIGN_BY_ID_REQUEST'
});

// find campaign by ID Success
export const fetchCampaignByIdSuccess = matchedCampaign => ({
  type: 'FETCH_CAMPAIGN_BY_ID_SUCCESS',
  response: matchedCampaign[0]
});

// fetch campaign thunk
export const populateActiveCampaign = campaignId => async dispatch => {
  dispatch(fetchCampaignByIdRequest());
  await campaignsRef.where('campaignId', '==', campaignId).onSnapshot(querySnapshot => {
    const matchedCampaign = [];
    querySnapshot.forEach(doc => {
      matchedCampaign.push({
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate()
      });
    });
    dispatch(fetchCampaignByIdSuccess(matchedCampaign));
  });
};
