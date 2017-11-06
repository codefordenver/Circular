import { browserHistory } from 'react-router';
import createApiRequest from '../../utils/createApiRequest';

import { UPDATE_NEW_CAMPAIGN } from "../constants/newCampaign";

export function createCampaign(campaignInfo) {
	return {
		type: 'CREATE_NEW_CAMPAIGN',
		promise: createApiRequest("api/campaigns", "POST", { ...campaignInfo })
	};
}

// export function createCampaignFlow(campaignInfo) {
// 	return async dispatch => {
// 		try {
// 			const { response } = await dispatch(createCampaign(campaignInfo));
// 			browserHistory.push(`/campaign/${response.data._id}`);
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	};
// }

export function updateNewCampaign(data) {
	return {
		type: UPDATE_NEW_CAMPAIGN,
		data
	};
}
