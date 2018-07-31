// *******
// WASTE PROVIDER ACTIONS
// *******

import { wasteProvidersRef } from "../../firebase";
import wasteProviders from "../../utils/wasteProviders";

// FETCH WASTE PROVIDERS REQUEST
export const FETCH_WASTE_PROVIDERS_REQUEST = "FETCH_WASTE_PROVIDERS_REQUEST";
export const firebaseFetchWasteProvidersRequest = () => ({
  type: FETCH_WASTE_PROVIDERS_REQUEST
});

// POPULATE WASTE PROVIDERS
export const FETCH_WASTE_PROVIDERS_SUCCESS = "FETCH_WASTE_PROVIDERS_SUCCESS";
export const firebasePopulateWasteProviders = allWasteProviders => ({
  type: FETCH_WASTE_PROVIDERS_SUCCESS,
  response: allWasteProviders
});

// FETCH WASTE PROVIDERS ERROR
export const FETCH_WASTE_PROVIDERS_ERROR = "FETCH_WASTE_PROVIDERS_ERROR";
export const firebaseErrorFetchWasteProviders = error => ({
  type: FETCH_WASTE_PROVIDERS_ERROR,
  error
});

// FETCH WASTE PROVIDERS THUNK
export const firebaseFetchWasteProviders = () => dispatch => {
  dispatch(firebaseFetchWasteProvidersRequest());
  wasteProvidersRef
    .orderBy("name", "asc")
    .get()
    .then(snapshot => {
      const allWasteProviders = [];
      snapshot.forEach(doc => {
        const { email, name, phone } = doc.data();
        allWasteProviders.push({
          email,
          id: doc.id,
          name,
          phone
        });
      });
      dispatch(firebasePopulateWasteProviders(allWasteProviders));
    })
    .catch(err => {
      // console.log('Error getting documents', err);
    });
};

// *******
// WRITES DOCUMENTS FOR WASTEPROVIDERS DATA
// *******

export const setWasteProviders = () => {
  wasteProviders.forEach(provider => {
    const { name, email, phone } = provider;
    const wasteProvider = {
      name,
      email,
      phone
    };
    return wasteProvidersRef.doc().set(wasteProvider);
  });
};

// *******
// WRITES DOCUMENTS FOR WASTEPROVIDERS DATA
// *******
