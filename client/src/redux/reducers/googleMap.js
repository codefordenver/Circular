import { OPEN_MAP, CLOSE_MAP } from '../constants/googleMap';

const defaultState = {
  isOpen: false
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case OPEN_MAP:
      return {
        ...state,
        isOpen: true
      };
    case CLOSE_MAP:
      return {
        ...state,
        isOpen: false
      };
    default:
      return state;
  }
}
