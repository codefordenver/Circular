import { campaignsRef } from '../../firebase';

// FETCH CAMPAIGN BY ID REQUEST
export const FIREBASE_FETCH_CAMPAIGN_BY_ID_REQUEST = 'FIREBASE_FETCH_CAMPAIGN_BY_ID_REQUEST';
export const firebaseFetchCampaignByIdRequest = () => ({
  type: FIREBASE_FETCH_CAMPAIGN_BY_ID_REQUEST
});

// FETCH CAMPAIGN BY ID SUCCESS
export const FIREBASE_FETCH_CAMPAIGN_BY_ID_SUCCESS = 'FIREBASE_FETCH_CAMPAIGN_BY_ID_SUCCESS';
export const firebaseFetchCampaignByIdSuccess = matchedCampaign => ({
  type: FIREBASE_FETCH_CAMPAIGN_BY_ID_SUCCESS,
  response: matchedCampaign
});

// FETCH CAMPAIGN BY ID ERROR
export const FIREBASE_FETCH_CAMPAIGN_BY_ID_ERROR = 'FIREBASE_FETCH_CAMPAIGN_BY_ID_ERROR';
export const firebaseFetchCampaignByIdError = error => ({
  type: FIREBASE_FETCH_CAMPAIGN_BY_ID_ERROR,
  error
});

// FETCH CAMPAIGN BY ID THUNK
export const firebasePopulateCampaignById = campaignId => async dispatch => {
  dispatch(firebaseFetchCampaignByIdRequest());
  // SET DOCUMENT REFERENCE AND SEARCH FOR MATCHING CAMPAIGN
  const fetchedCampaign = await campaignsRef
    .doc(campaignId)
    .get()
    .then(doc => {
      if (!doc.exists) {
        // ERROR: SUCCESSFUL SEARCH BUT DOCUMENT DOESN'T EXIST
        const err = 'There was an error fetching this campaignId';
        return dispatch(firebaseFetchCampaignByIdError(err));
      }
      // SUCCESS: DISPATCH MATCHED CAMPAIGN DETAILS
      const data = doc.data();
      const matchedCampaign = {
        campaignId: data.campaignId,
        modifiedAt: data.modifiedAt.toDate(),
        createdAt: data.createdAt.toDate(),
        address: data.address,
        latLng: data.latLng
      };
      // RETURN FOUND CAMPAIGN AND CAMPAIGN DATA
      return matchedCampaign;
    })
    // ERROR: ERROR CONNECTION TO DB OR WITH SEARCH
    .catch(err => {
      dispatch(firebaseFetchCampaignByIdSuccess(err));
    });
  // SET DOCUMENT REFERENCE FOR FOUNDCAMPAIGN SIGNATURES
  const campaignSignaturesRef = campaignsRef.doc(campaignId).collection('signatures');
  // DEFINE SIGNEE DISPLAY NAMES ARRAY
  const activeCampaignSignatures = [];
  // MAKE FIREBASE CALL TO POPULATE SIGNEE DISPLAY NAMES ARRAY
  await campaignSignaturesRef
    .get()
    .then(signaturesSnapshot => {
      signaturesSnapshot.forEach(doc => {
        const data = doc.data();
        activeCampaignSignatures.push({
          displayName: data.displayName,
          uid: data.uid,
          signerMessage: data.signerMessage
        });
      });
      // DISPATCH MERGED FETCHED CAMPAIGN AND SIGNATURES
      dispatch(firebaseFetchCampaignByIdSuccess({ ...fetchedCampaign, activeCampaignSignatures }));
    })
    .catch(err => {
      // TODO ADD ERROR HANDELING FOR SIGNATURES ERRORS ONLY
      /* eslint-disable no-console */
      console.log('Error fetching campaignSignatures', err);
    });
};
