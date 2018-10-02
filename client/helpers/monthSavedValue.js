import moment from 'moment';

const monthSavedValue = function( { createdAt, settings } ) {
	let monthSaved;
	let createdUser = moment(createdAt);
  let todayDate = moment(moment().format());
  let daysFromCreated = todayDate.diff(createdUser, 'days');
  let today = parseInt(moment().format('D'));
  let daysInMonth = parseInt(todayDate.daysInMonth());
  let dayCost = settings.monthCost / daysInMonth;
  let sameMonthCreated = todayDate.isSame(createdUser, 'month');
  let sameMonth = todayDate.isSame(moment(settings.lastMonthWasted.date), 'month');
  // console.log(sameMonthCreated)
  // daysFromCreated = 60
  if (daysFromCreated < daysInMonth && sameMonthCreated) {
    // console.log('sanemonth 1')
    monthSaved = (dayCost * daysFromCreated - settings.lastMonthWasted.how).toFixed();
    if (monthSaved < 0) {
      monthSaved = 0;
    }
  }
  else {
    // console.log('sanemonth 2')
    monthSaved = (dayCost * today - settings.lastMonthWasted.how).toFixed();
    if (monthSaved < 0) {
      monthSaved = 0;
    }
  }
  return monthSaved;
}

export default monthSavedValue;