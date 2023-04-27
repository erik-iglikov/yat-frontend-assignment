import moment from 'moment';

/**
 * Transforms the date of an action into a human readable string.
 * 
 * @param actionDate date of when the action happened
 * @returns formatted string of how long ago the action happened 
 */
export const getHumanReadableTimeAgo = (actionDate: string): string => {
  const now: moment.Moment = moment();
  const actionDateObj: moment.Moment = moment(actionDate);
  const diffDuration: moment.Duration = moment.duration(now.diff(actionDateObj));

  const years: number = diffDuration.years();
  const months: number = diffDuration.months();
  const days: number = diffDuration.days();
  const hours: number = diffDuration.hours();
  const minutes: number = diffDuration.minutes();

  if (years > 0) {
    return `${years}Y AGO`;
  } else if (months > 0) {
    return `${months}M AGO`;
  } else if (days > 0) {
    return `${days}D AGO`;
  } else if (hours > 0) {
    return `${hours}H AGO`;
  } else {
    return `${minutes}MIN AGO`;
  }
};