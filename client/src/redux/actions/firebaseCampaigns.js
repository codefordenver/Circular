import { campaignsRef } from '../../firebase';

// POPULATE CAMPAIGNS REQUEST
export const FETCH_FIREBASE_CAMPAIGNS_REQUEST = 'FETCH_FIREBASE_CAMPAIGNS_REQUEST';
export const firebaseFetchCampaignsRequest = () => ({
  type: FETCH_FIREBASE_CAMPAIGNS_REQUEST
});

// POPULATE CAMPAIGNS SUCCESS
export const FETCH_FIREBASE_CAMPAIGNS_SUCCESS = 'FETCH_FIREBASE_CAMPAIGNS_SUCCESS';
export const firebasePopulateCampaignsSuccess = (
  firebaseCampaigns,
  firebaseCampaignsAddresses
) => ({
  type: FETCH_FIREBASE_CAMPAIGNS_SUCCESS,
  response: { firebaseCampaigns, firebaseCampaignsAddresses }
});

// POPULATE CAMPAIGNS
export const firebaseFetchCampaigns = (
  firebaseCampaigns,
  firebaseCampaignsAddresses
) => dispatch => {
  dispatch(firebaseFetchCampaignsRequest());
  dispatch(firebasePopulateCampaignsSuccess(firebaseCampaigns, firebaseCampaignsAddresses));
};

// START LISTENING FOR NEW CAMPAIGNS
export const startListeningForCampaigns = () => dispatch => {
  campaignsRef.onSnapshot(querySnapshot => {
    const firebaseCampaigns = [];
    const firebaseCampaignsAddresses = [];
    querySnapshot.forEach(doc => {
      // GET EACH CAMPAIGN'S DATA
      const data = doc.data();
      // SPLIT OUT ADDRESS FOR FUTURE USE
      const address = data.address;
      // PUSH EACH CAMPAIGN OBJECT TO FIREBASECAMPAIGNS
      firebaseCampaigns.push({
        campaignId: data.campaignId,
        modifiedAt: data.modifiedAt,
        createdAt: data.createdAt,
        address,
        latLng: data.latLng
      });
      // PUSH ADDRESS TO FIREBASECAMPAIGNSADDRESS
      firebaseCampaignsAddresses.push(address);
    });
    dispatch(firebaseFetchCampaigns(firebaseCampaigns, firebaseCampaignsAddresses));
  });
};

// POPULATE ACTIVE CAMPAIGN REQUEST
export const FIREBASE_POPULATE_ACTIVE_CAMPAIGN_REQUEST =
  'FIREBASE_POPULATE_ACTIVE_CAMPAIGN_REQUEST';
export const populateActiveCampaignRequest = () => ({
  type: FIREBASE_POPULATE_ACTIVE_CAMPAIGN_REQUEST
});

// POPULATE ACTIVE CAMPAIGN SUCCESS
export const FIREBASE_POPULATE_ACTIVE_CAMPAIGN_SUCCESS =
  'FIREBASE_POPULATE_ACTIVE_CAMPAIGN_SUCCESS';
export const populateActiveCampaignSuccess = activeCampaignId => ({
  type: FIREBASE_POPULATE_ACTIVE_CAMPAIGN_SUCCESS,
  response: activeCampaignId
});

// POPULATE ACTIVE CAMPAIGN
export const firebasePopulateActiveCampaign = activeCampaignId => async dispatch => {
  dispatch(populateActiveCampaignRequest());
  dispatch(populateActiveCampaignSuccess(activeCampaignId));
};

// CREATE NEW CAMPAIGN REQUEST
export const FIREBASE_CREATE_NEW_CAMPAIGN_REQUEST = 'FIREBASE_CREATE_NEW_CAMPAIGN_REQUEST';
export const firebaseCreateNewCampaignRequest = () => ({
  type: FIREBASE_CREATE_NEW_CAMPAIGN_REQUEST
});

// CREATE NEW CAMPAIGN SUCCESS
export const FIREBASE_CREATE_NEW_CAMPAIGN_SUCCESS = 'FIREBASE_CREATE_NEW_CAMPAIGN_SUCCESS';
export const firebaseCreateNewCampaignSuccess = newlyCreatedCampaign => ({
  type: FIREBASE_CREATE_NEW_CAMPAIGN_SUCCESS,
  response: newlyCreatedCampaign
});

// CREATE NEW CAMPAIGN THUNK
export const firebaseCreateNewCampaign = (address, latLng) => async dispatch => {
  dispatch(firebaseCreateNewCampaignRequest);
  // Add a new campaign document in collection "campaigns"
  // RETURNS FIRESTORE GENERATED ID
  const newCampaignId = campaignsRef.doc();
  // RETURNS TIMESTAMP
  const timestamp = new Date();
  // SETS FIRESTORE RECORD WITH GENERATED ID
  await newCampaignId
    .set({
      campaignId: newCampaignId.id,
      address,
      latLng,
      createdAt: timestamp,
      modifiedAt: timestamp
    })
    .catch(error => {
      console.error('Error writing document: ', error);
    });
  // SETS ACTIVE CAMPAIGN TO CAMPAIGN ID CREATED ABOVE
  dispatch(firebasePopulateActiveCampaign(newCampaignId.campaignId));
  // TODO clear search information
};
