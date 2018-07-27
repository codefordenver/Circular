import { campaignsRef, Timestamp } from "../../firebase";

// CREATE NEW CAMPAIGN REQUEST
export const FIREBASE_CREATE_NEW_CAMPAIGN_REQUEST =
  "FIREBASE_CREATE_NEW_CAMPAIGN_REQUEST";
export const firebaseCreateNewCampaignRequest = () => ({
  type: FIREBASE_CREATE_NEW_CAMPAIGN_REQUEST
});

// CREATE NEW CAMPAIGN SUCCESS
export const FIREBASE_CREATE_NEW_CAMPAIGN_SUCCESS =
  "FIREBASE_CREATE_NEW_CAMPAIGN_SUCCESS";
export const firebaseCreateNewCampaignSuccess = newlyCreatedCampaign => ({
  type: FIREBASE_CREATE_NEW_CAMPAIGN_SUCCESS,
  response: newlyCreatedCampaign
});

// CREATE NEW CAMPAIGN THUNK
export const firebaseCreateNewCampaign = (
  address,
  latLng
) => async dispatch => {
  dispatch(firebaseCreateNewCampaignRequest());
  // ADD NEW DOCUMENT IN COLLECTION 'CAMPAIGNS'
  // RETURNS FIRESTORE GENERATED ID
  const newCampaignRef = campaignsRef.doc();
  const newCampaignData = {
    campaignId: newCampaignRef.id,
    address,
    latLng,
    createdAt: Timestamp,
    modifiedAt: Timestamp,
    wasterProvider: {
      name: null,
      address: null,
      phone: null,
      email: null
    },
    propertyManager: {
      name: null,
      address: null,
      phone: null,
      email: null
    },
    buildingInfo: {
      numBuldings: null,
      numUnits: null
    }
  };
  // SETS FIRESTORE RECORD WITH GENERATED ID
  await newCampaignRef.set({ ...newCampaignData }).catch(error => {
    console.error("Error writing document: ", error);
  });
  // SETS ACTIVE CAMPAIGN TO CAMPAIGN ID CREATED ABOVE
  dispatch(firebasePopulateActiveCampaign(newCampaignRef.id));
  // TODO clear search information
};

// LISTENING FOR NEW CAMPAIGNS
export const startListeningForCampaigns = () => dispatch => {
  campaignsRef.onSnapshot(querySnapshot => {
    const firebaseCampaigns = [];
    const firebaseCampaignsAddresses = [];
    querySnapshot.forEach(doc => {
      //  EACH CAMPAIGN'S DATA
      const data = doc.data();
      console.log(data);
      // SPLIT OUT ADDRESS FOR FUTURE USE
      const address = data.address;
      // PUSH EACH CAMPAIGN OBJECT TO FIREBASECAMPAIGNS
      firebaseCampaigns.push({
        campaignId: data.campaignId,
        modifiedAt: Timestamp,
        createdAt: Timestamp,
        address,
        latLng: data.latLng
      });
      // PUSH ADDRESS TO FIREBASECAMPAIGNSADDRESS
      firebaseCampaignsAddresses.push(address);
    });
    dispatch(
      firebaseFetchCampaigns(firebaseCampaigns, firebaseCampaignsAddresses)
    );
  });
};

// POPULATE CAMPAIGNS FROM LISTENER
// POPULATE CAMPAIGNS REQUEST
export const FETCH_FIREBASE_CAMPAIGNS_REQUEST =
  "FETCH_FIREBASE_CAMPAIGNS_REQUEST";
export const firebaseFetchCampaignsRequest = () => ({
  type: FETCH_FIREBASE_CAMPAIGNS_REQUEST
});

// POPULATE CAMPAIGNS SUCCESS
export const FETCH_FIREBASE_CAMPAIGNS_SUCCESS =
  "FETCH_FIREBASE_CAMPAIGNS_SUCCESS";
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
  dispatch(
    firebasePopulateCampaignsSuccess(
      firebaseCampaigns,
      firebaseCampaignsAddresses
    )
  );
};

// POPUATED ON NEW CAMPAIGN CREATION
// POPULATE ACTIVE CAMPAIGN REQUEST
export const FIREBASE_POPULATE_ACTIVE_CAMPAIGN_REQUEST =
  "FIREBASE_POPULATE_ACTIVE_CAMPAIGN_REQUEST";
export const populateActiveCampaignRequest = () => ({
  type: FIREBASE_POPULATE_ACTIVE_CAMPAIGN_REQUEST
});

// POPULATE POPULATE ACTIVE CAMPAIGN SUCCESS
export const FIREBASE_POPULATE_ACTIVE_CAMPAIGN_SUCCESS =
  "FIREBASE_POPULATE_ACTIVE_CAMPAIGN_SUCCESS";
export const populateActiveCampaignSuccess = activeCampaign => {
  console.log("popualteactive ", activeCampaign);
  return {
    type: FIREBASE_POPULATE_ACTIVE_CAMPAIGN_SUCCESS,
    response: activeCampaign
  };
};

// POPULATE ACTIVE CAMPAIGN THUNK
export const firebasePopulateActiveCampaign = activeCampaign => async dispatch => {
  dispatch(populateActiveCampaignRequest());
  dispatch(populateActiveCampaignSuccess(activeCampaign));
};

// UPDATE CAMPAIGN
// UPDATE CAMPAIGN REQUEST
export const FIREBASE_UPDATE_CAMPAIGN_REQUEST =
  "FIREBASE_UPDATE_CAMPAIGN_REQUEST";
const firebaseUpdateCampaignRequest = () => ({
  type: FIREBASE_UPDATE_CAMPAIGN_REQUEST
});

// UPDATE CAMPAIGN SUCESS
export const FIREBASE_UPDATE_CAMPAIGN_SUCCESS =
  "FIREBASE_UPDATE_CAMPAIGN_SUCCESS";
const firebaseUpdateCampaignSuccess = () => ({
  type: FIREBASE_UPDATE_CAMPAIGN_SUCCESS
});

// UPDATE CAMPAIGN ERROR
export const FIREBASE_UPDATE_CAMPAIGN_ERROR = "FIREBASE_UPDATE_CAMPAIGN_ERROR";
const firebaseUpdateCampaignError = error => ({
  type: FIREBASE_UPDATE_CAMPAIGN_ERROR,
  response: error
});

// UPDATE CAMPAIGN THUNK
export const firebaseUpdateCampaign = (
  campaignId,
  updates
) => async dispatch => {
  dispatch(firebaseUpdateCampaignRequest());
  // CHECK FOR WHICH DATA WAS UPDATED
  const { wasterProvider, propertyManager, buildingInfo } = updates;
  campaignsRef
    .doc(campaignId)
    .update({
      wasterProvider,
      propertyManager,
      buildingInfo
    })
    .then(result => {
      console.log("Data Sucessfully Udated, refreshing campaign");
      dispatch(firebasePopulateActiveCampaign(campaignId));
    })
    .catch(error => {
      console.log("oops, something when wrong", error);
      dispatch(firebaseUpdateCampaignError(error));
    });
};
