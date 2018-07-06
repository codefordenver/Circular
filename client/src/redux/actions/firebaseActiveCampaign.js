import { campaignsRef } from '../../firebase';

// find campaign by ID request
export const fetchCampaignByIdRequest = () => ({
  type: 'FETCH_CAMPAIGN_BY_ID_REQUEST'
});

// find campaign by ID Success
export const fetchCampaignByIdSuccess = matchedCampaign => ({
  type: 'FETCH_CAMPAIGN_BY_ID_SUCCESS',
  response: matchedCampaign
});

// fetch campaign thunk
export const populateActiveCampaign = campaignId => async dispatch => {
  dispatch(fetchCampaignByIdRequest());
  await campaignsRef.where('campaignId', '==', '40HkTeLTRFQwH4pTDhER').onSnapshot(querySnapshot => {
    const matchedCampaign = [];
    querySnapshot.forEach(doc => {
      matchedCampaign.push(doc.data());
    });
    dispatch(fetchCampaignByIdSuccess(matchedCampaign));
  });
};
