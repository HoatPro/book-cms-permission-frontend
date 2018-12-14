import moment from 'moment';

const getAllDateBetweenTwoDays = (startDate, endDate) => {
  const dates = [];

  const currDate = moment(startDate).startOf('day');
  const lastDate = moment(endDate).startOf('day');

  do {
    dates.push(moment(currDate.clone().toDate()).format('DD-MM-YYYY'));
  } while (currDate.add(1, 'days').diff(lastDate) < 1);

  return dates;
};

const getTimeBetween = (startTime, endTime) => {
  const distance = endTime.getTime() - startTime.getTime();
  const oneHours = 60 * 60 * 1000;
  const oneMinutes = 60 * 1000;
  if (distance < 0) return '0.0s';
  if (distance > oneHours) {
    return `${moment.utc(distance).format('H')}h${moment.utc(distance).format('m')}m`;
  }
  if (distance > oneMinutes) {
    return `${moment.utc(distance).format('m')}m${moment.utc(distance).format('s')}s`;
  }
  return `${moment.utc(distance).format('s.S')}s`;
};

const convertDateStringFomat = (dateString) => {
  // convert DD/MM/YYYY to YYYY/MM/DD
  const date = moment(dateString, 'DD/MM/YYYY');
  return date.format('YYYY-MM-DD');
};

export {
  getAllDateBetweenTwoDays,
  getTimeBetween,
  convertDateStringFomat,
};
