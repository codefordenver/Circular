import { campaignsRef, usersRef, Timestamp } from '../../firebase';
import { firebaseFetchUserSignedCampaigns } from '../actions/firebaseAuth';
import {
  firebasePopulateCampaignById,
  firebaseFetchCampaignByIdError
} from '../actions/firebaseActiveCampaign';

// FETCH SIGNATURE ACTIONS
// FETCH FIREBASE USER SIGNATURES REQUEST
export const FETCH_FIREBASE_SIGNATURES_REQUEST = 'FETCH_FIREBASE_SIGNATURES_REQUEST';
export const firebaseFetchUserSignaturesRequest = () => ({
  type: FETCH_FIREBASE_SIGNATURES_REQUEST
});

// POPULATE FIREBASE USER SIGNATURES (SUCCESS)
// TODO UPDATE FUNCTION NAME
export const FETCH_FIREBASE_SIGNATURES_SUCCESS = 'FETCH_FIREBASE_SIGNATURES_SUCCESS';
export const populateFirebaseUserSignatures = firebaseUserSignatures => ({
  type: FETCH_FIREBASE_SIGNATURES_SUCCESS,
  response: firebaseUserSignatures
});

// THUNK FOR FIREBASE SIGNATURES
export const firebaseFetchUserSignatures = firebaseUserSignatures => dispatch => {
  dispatch(firebaseFetchUserSignaturesRequest());
  dispatch(populateFirebaseUserSignatures(firebaseUserSignatures));
};

// START LISTENING FOR NEW SIGNATURES
// export const startListeningForSignatures = () => dispatch => {
//   signaturesRef.onSnapshot(querySnapshot => {
//     const signatures = [];
//     querySnapshot.forEach(doc => {
//       signatures.push({ userId: doc.data().userId, campaignId: doc.data().campaignId });
//     });
//     dispatch(firebaseFetchUserSignatures(signatures));
//   });
// };

// ADD SIGNATURE ACTIONS
// FIREBASE ADD SIGNATURE TO CAMPAIGN REQUEST
export const FIREBASE_ADD_SIGNATURE_TO_CAMPAIGN_REQUEST =
  'FIREBASE_ADD_SIGNATURE_TO_CAMPAIGN_REQUEST';
export const firebaseAddSignatureToCampaignRequest = firebaseUserSignatures => ({
  type: FIREBASE_ADD_SIGNATURE_TO_CAMPAIGN_REQUEST
});

// FIREBASE ADD SIGNATURE SUCCESS
export const FIREBASE_ADD_SIGNATURE_TO_CAMPAIGN_SUCCESS =
  'FIREBASE_ADD_SIGNATURE_TO_CAMPAIGN_SUCCESS';
export const firebaseAddSignatureToCampaignSuccess = addSignatureSuccessObject => ({
  type: FIREBASE_ADD_SIGNATURE_TO_CAMPAIGN_SUCCESS,
  response: addSignatureSuccessObject
});

// FIREBASE ADD SIGNATURE ERROR
export const FIREBASE_ADD_SIGNATURE_TO_CAMPAIGN_ERROR = 'FIREBASE_ADD_SIGNATURE_TO_CAMPAIGN_ERROR';
export const firebaseAddSignatureToCampaignError = addSignatureError => ({
  type: FIREBASE_ADD_SIGNATURE_TO_CAMPAIGN_ERROR,
  error: addSignatureError
});

// FIREBASE ADD SIGNATURE THUNK
export const firebaseAddSignatureToCampaign = signatureObject => async dispatch => {
  dispatch(firebaseAddSignatureToCampaignRequest());
  const { campaignId, uid, displayName, signerMessage, keepMeUpdated } = signatureObject;
  const addSignatureRef = campaignsRef.doc(campaignId).collection('signatures');
  // .add GETS A GENERATED ID FROM FIREBASE
  addSignatureRef
    .add(
      // IF DOCUMENT EXISTS, OVERWRITE, IS DOESN'T EXIST, CREATE
      {
        uid,
        displayName,
        signerMessage,
        keepMeUpdated,
        createdAt: Timestamp,
        modifiedAt: Timestamp
      }
    )
    // TODO REMOVE AFTER TESTING
    /* eslint-disable no-console */
    .then(dispatch(firebasePopulateCampaignById(campaignId)))
    .catch(err => {
      dispatch(firebaseFetchCampaignByIdError(err));
    });
  const addSignatureUserRef = usersRef.doc(uid);
  addSignatureUserRef
    .set(
      {
        signedCampaignId: campaignId,
        signedCampaignTimestamp: Timestamp
      },
      { merge: true }
    )
    .then(dispatch(firebaseFetchUserSignedCampaigns(uid)));
};

// REMOVE SIGNATURE ACTIONS
// FIREBASE REMOVE SIGNATURE REQUEST
export const FIREBASE_REMOVE_SIGNATURE_FROM_CAMPAIGN_REQUEST =
  'FIREBASE_REMOVE_SIGNATURE_FROM_CAMPAIGN_REQUEST';
export const firebaseRemoveSignatureFromCampaignRequest = () => ({
  type: FIREBASE_REMOVE_SIGNATURE_FROM_CAMPAIGN_REQUEST
});

// FIREBASE REMOVE SIGNATURE SUCCESS
export const FIREBASE_REMOVE_SIGNATURE_FROM_CAMPAIGN_SUCCESS =
  'FIREBASE_REMOVE_SIGNATURE_FROM_CAMPAIGN_SUCCESS';
export const firebaseRemoveSignatureFromCampaignSuccess = () => ({
  type: FIREBASE_REMOVE_SIGNATURE_FROM_CAMPAIGN_SUCCESS
});

// FIREBASE REMOVE SIGNATURE ERROR
export const FIREBASE_REMOVE_SIGNATURE_FROM_CAMPAIGN_ERROR =
  'FIREBASE_REMOVE_SIGNATURE_FROM_CAMPAIGN_ERROR';
export const firebaseRemoveSignatureFromCamaignError = () => ({
  type: FIREBASE_REMOVE_SIGNATURE_FROM_CAMPAIGN_ERROR
});

// FIREBASE REMOVE SIGNATURE THUNK
// TODO EXPLORE KEEP RECORD OF DELETED SIGNATURES
export const firebaseRemoveSignatureFromCampaign = (campaignId, uid) => async dispatch => {
  // dispatch(firebaseRemoveSignatureFromCampaignRequest());
  const campaignSignatureRef = campaignsRef.doc(campaignId).collection('signatures');
  let deleteSignatureRef;
  await campaignSignatureRef
    .where('uid', '==', uid)
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        deleteSignatureRef = doc.id;
      });
    });
  await campaignSignatureRef
    .doc(deleteSignatureRef)
    .delete()
    .then(() => {
      dispatch(firebasePopulateCampaignById(campaignId));
      console.log('Document fue deletado');
    })
    .catch(err => {
      console.log('fue error ', err);
    });
  const removeSignatureUserRef = usersRef.doc(uid);
  await removeSignatureUserRef
    .set(
      {
        signedCampaignId: null,
        modifiedSignedCampaignTimestamp: Timestamp
      },
      { merge: true }
    )
    .then(dispatch(firebaseFetchUserSignedCampaigns(uid)));
};
