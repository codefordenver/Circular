import { UPDATE_NEW_CAMPAIGN } from "../constants/newCampaign";

export default function(state = {}, action) {
	const { type, data } = action;
	switch (type) {
		case UPDATE_NEW_CAMPAIGN:
			return {
				...state,
				...data
			};
		default:
			return state;
	}
}
