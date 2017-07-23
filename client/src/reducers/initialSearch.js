import {
  APARTMENT_MATCHES_REQUEST,
  APARTMENT_MATCHES_SUCCESS,
  APARTMENT_MATCHES_FAILURE,
  VALIDATE_ADDRESS_SUCCESS,
  VALIDATE_ADDRESS_FAILURE,
  CLEAR_SEARCH_RESULTS
} from '../constants/apartments';

const defaultState = {
  loading: false,
  loaded: false,
  searchedAddress: null,
  error: null,
  nearbyCampaigns: null
};

export default function (state = defaultState, action) {
  const { response, error, type } = action;
  switch (type) {
    case APARTMENT_MATCHES_REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case VALIDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        searchedAddress: response[0]
      };
    case VALIDATE_ADDRESS_FAILURE:
      return {
        error: {
          userMessage: "Sorry, we couldn't locate that address. Try selecting one of the auto-suggested addresses for better accuracy.",
          searchError: error
        }
      };
    case APARTMENT_MATCHES_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        nearbyCampaigns: response
      };
    case APARTMENT_MATCHES_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: {
          userMessage: 'Sorry, but something went wrong.',
          dbResponse: error
        }
      };
    case CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        ...defaultState
      };
    default:
      return state;
  }
}

// const reducerOptions = {
//   name: 'nearbyCampaigns',
//   dataLabel: 'response',
//   async: true
// }

// function createDefaultReducer(options) {
//   const { name, async, dataLabel } = options;
//   if (async) {
//     const defaultState = {
//       loading: false,
//       loaded: false
//     };
//     return (state = defaultState){

//     }
//   }
//   function (){
//     if(options.async)
//   }

// }
