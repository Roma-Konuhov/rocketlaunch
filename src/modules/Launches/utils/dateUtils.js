import moment from 'moment';

export const getLaunchDate = item => {
  if (!item.net) {
    return 'No date';
  }
  return moment(item.net, 'MMMM D, YYYY HH:mm:ss').format('MMM D, YYYY');
};
