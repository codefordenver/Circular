export const MIN_CAMPAIGN_DURATION = 21;
export const ONE_DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

export const calculateCampaignDuration = creationDateString => {
  const creationDate = new Date(creationDateString);
  const expireDate = new Date(creationDateString);
  // the campaign is set to expire the first Monday 3-weeks after campaign creation
  expireDate.setDate(expireDate.getDate() + MIN_CAMPAIGN_DURATION);
  expireDate.setDate(expireDate.getDate() + (1 + 7 - expireDate.getDay()) % 7);

  const timeDiff = Math.abs(expireDate.getTime() - creationDate.getTime());
  const diffDays = Math.ceil(timeDiff / ONE_DAY_IN_MILLISECONDS);
  return diffDays;
};
