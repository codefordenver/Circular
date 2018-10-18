import { campaignsRef, usersRef, Timestamp } from '../../firebase';
import { firebaseFetchUserData } from '../actions/firebaseAuth';
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
  dispatch(firebaseFetchUserData());
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
export const firebaseAddSignatureToCampaignRequest = () => ({
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
  const addSignatureRef = campaignsRef
    .doc(campaignId)
    .collection('signatures')
    .doc(uid);
  //  USE UID TO DEFINE SIGNATURE DOC
  addSignatureRef
    .set(
      // IF DOCUMENT EXISTS, OVERWRITE, IF DOESN'T EXIST, CREATE
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
        signedCampaignTimestamp: Timestamp,
        keepMeUpdated
      },
      { merge: true }
    )
    .then(dispatch(firebaseFetchUserData(uid)));
};

// ADMIN ADD SIGNATURE
// ADMIN ADD SIGNATURE REQUEST
export const FIREBASE_ADMIN_ADD_SIGNATURE_REQUEST = 'FIREBASE_ADMIN_ADD_SIGNATURE_REQUEST ';
const firebaseAdminAddSignatureRequest = () => ({
  type: FIREBASE_ADMIN_ADD_SIGNATURE_REQUEST
});

// ADMIN ADD SIGNATURE SUCCESS
export const FIREBASE_ADMIN_ADD_SIGNATURE_SUCCESS = 'FIREBASE_ADMIN_ADD_SIGNATURE_SUCCESS';
const firebaseAdminAddSignatureSuccess = () => ({
  type: FIREBASE_ADMIN_ADD_SIGNATURE_SUCCESS
});

// ADMIN ADD SIGNATURE ERROR
export const FIREBASE_ADMIN_ADD_SIGNATURE_ERROR = 'FIREBASE_ADMIN_ADD_SIGNATURE_ERROR';
const firebaseAdminAddSignatureError = error => ({
  type: FIREBASE_ADMIN_ADD_SIGNATURE_ERROR,
  error
});

// ADMIN ADD SIGNATURE
export const firebaseAdminAddSignature = adminAddSignatureObject => async dispatch => {
  dispatch(firebaseAdminAddSignatureRequest());
  const {
    addedByAdminUid,
    campaignId,
    email,
    displayName,
    keepMeUpdated,
    signerMessage
  } = adminAddSignatureObject;
  try {
    const newSignerRef = usersRef.doc();
    await newSignerRef.set({
      addedByAdminUid,
      createdAt: Timestamp,
      displayName,
      email,
      keepMeUpdated,
      modifiedAt: Timestamp,
      providerId: null,
      signedCampaignId: campaignId,
      signerMessage
    });

    await campaignsRef
      .doc(adminAddSignatureObject.campaignId)
      .collection('signatures')
      .doc(newSignerRef.id)
      .set({
        createdAt: Timestamp,
        displayName,
        keepMeUpdated,
        modifiedAt: Timestamp,
        signerMessage
      });
    dispatch(firebaseAdminAddSignatureSuccess());
    dispatch(firebasePopulateCampaignById(adminAddSignatureObject.campaignId));
  } catch (error) {
    dispatch(firebaseAdminAddSignatureError(error));
  }
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
export const firebaseRemoveSignatureFromCampaignError = () => ({
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
    .then(dispatch(firebaseFetchUserData(uid)));
};
