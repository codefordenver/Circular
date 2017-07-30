import { OPEN_MAP, CLOSE_MAP } from '../constants/googleMap';

export function openMap() {
  return {
    type: OPEN_MAP
  };
}

export function closeMap() {
  return {
    type: CLOSE_MAP
  };
}
