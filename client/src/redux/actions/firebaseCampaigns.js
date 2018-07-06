import { campaignsRef } from '../../firebase';

export const firebaseFetchCampaignsRequest = () => ({
  type: 'FETCH_FIREBASE_CAMPAIGNS_REQUEST'
});

export const firebasePopulateCampaignsSuccess = firebaseCampaigns => ({
  type: 'FETCH_FIREBASE_CAMPAIGNS_SUCCESS',
  response: firebaseCampaigns
});

export const firebaseFetchCampaigns = firebaseCampaigns => dispatch => {
  dispatch(firebaseFetchCampaignsRequest());
  dispatch(firebasePopulateCampaignsSuccess(firebaseCampaigns));
};

// start listening for new signatures
export const startListeningForCampaigns = () => dispatch => {
  campaignsRef.onSnapshot(querySnapshot => {
    const firebaseCampaigns = [];
    querySnapshot.forEach(doc => {
      const data = doc.data();
      firebaseCampaigns.push({
        campaignId: data.campaignId,
        updatedAt: data.updatedAt,
        createdAt: data.createdAt,
        address: data.address,
        latLng: data.latLng
      });
    });
    dispatch(firebaseFetchCampaigns(firebaseCampaigns));
  });
};

// {
//     "updatedAt": "2018-04-17T20:04:34.525Z",
//     "createdAt":
//         "2018-04-17T20:04:34.525Z",
//     "address": "2301 E Colfax Ave, Denver, CO 80206, USA",
//     "name": "2301 E Colfax Ave",
//     "latLng": {
//         "type": "Point",
//         "coordinates": [
//             -104.95964630000003,
//             39.740175
//         ]
//     }
// }
