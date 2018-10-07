import moment from 'moment';

const totalSavedValue = function( { createdAt, settings }, todayDateOut ) {
	let totalSaved;
	let createdUser = moment(createdAt);
  let todayDate = todayDateOut || moment(moment().format());
  let daysFromCreated = todayDate.diff(createdUser, 'days');
  let dayCost = settings.monthCost / 30;
  if (daysFromCreated > 0) {
    totalSaved = (dayCost * daysFromCreated).toFixed() - settings.totalWasted;
    if (totalSaved < 0) {
      totalSaved = 0;
    }
  }else {
    totalSaved = 0
  }
  return totalSaved;
}

export default totalSavedValue;