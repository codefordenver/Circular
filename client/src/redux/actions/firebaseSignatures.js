import { signaturesRef, campaignsRef, Timestamp } from '../../firebase';

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
export const startListeningForSignatures = () => dispatch => {
  signaturesRef.onSnapshot(querySnapshot => {
    const signatures = [];
    querySnapshot.forEach(doc => {
      signatures.push({ userId: doc.data().userId, campaignId: doc.data().campaignId });
    });
    dispatch(firebaseFetchUserSignatures(signatures));
  });
};

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
  await addSignatureRef
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
    .then(docRef => console.log(...docRef));
};

// FIREBASE REMOVE SIGNATURE REQUEST

// FIREBASE REMOVE SIGNATURE SUCCESS

// FIREBASE REMOVE SIGNATURE ERROR

// FIREBASE REMOVE SIGNATURE THUNK
