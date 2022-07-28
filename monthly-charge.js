/**
 * Computes the monthly charge for a given subscription.
 *
 * @returns {number} The total monthly bill for the customer in cents, rounded
 * to the nearest cent. For example, a bill of $20.00 should return 2000.
 * If there are no active users or the subscription is null, returns 0.
 *
 * @param {string} month - Always present
 *   Has the following structure:
 *   "2022-04"  // April 2022 in YYYY-MM format
 *
 * @param {object} subscription - May be null
 *   If present, has the following structure:
 *   {
 *     'id': 763,
 *     'customerId': 328,
 *     'monthlyPriceInCents': 359  // price per active user per month
 *   }
 *
 * @param {array} users - May be empty, but not null
 *   Has the following structure:
 *   [
 *     {
 *       'id': 1,
 *       'name': "Employee #1",
 *       'customerId': 1,
 *   
 *       // when this user started
 *       'activatedOn': new Date("2021-11-04"),
 *   
 *       // last day to bill for user
 *       // should bill up to and including this date
 *       // since user had some access on this date
 *       'deactivatedOn': new Date("2022-04-10")
 *     },
 *     {
 *       'id': 2,
 *       'name': "Employee #2",
 *       'customerId': 1,
 *   
 *       // when this user started
 *       'activatedOn': new Date("2021-12-04"),
 *   
 *       // hasn't been deactivated yet
 *       'deactivatedOn': null
 *     },
 *   ]
 */
function monthlyCharge(month, subscription, users) {
  // your code here!
  const billingDate = new Date(month);
  const { customerId, monthlyPriceInCents } = subscription;
  const lastDayOfBillingMonth = lastDayOfMonth(billingDate);
  const numberOfDaysInMonth = lastDayOfBillingMonth.getDate();
  const dailyPriceInCents = monthlyPriceInCents/numberOfDaysInMonth;

  const monthlyCharge = users.reduce((total, user) => {
    let monthStartOffset = 0;
    let monthEndOffset = 0;
    let activeDays = 0;

    if (user.customerId !== customerId || user.activatedOn === null){
      return total
    }

    if ( user.activatedOn > billingDate ){
      if (isEventDateInBillingMonth(user.activatedOn, billingDate)) {
        monthStartOffset = user.activatedOn.getUTCDate() - 1;
      } else {
        monthStartOffset = numberOfDaysInMonth;
      }
    }

    if (user.deactivatedOn && user.deactivatedOn < lastDayOfBillingMonth) {
      if (isEventDateInBillingMonth(user.deactivatedOn, billingDate)) {
        monthEndOffset =  numberOfDaysInMonth - user.deactivatedOn.getUTCDate();
      } else {
        monthEndOffset = numberOfDaysInMonth;
      }
    }

    activeDays = numberOfDaysInMonth - monthStartOffset - monthEndOffset;

    return (activeDays * dailyPriceInCents) + total;

  }, 0)

  return Math.round(monthlyCharge);

}

/*******************
* Helper functions *
*******************/
/**
 * Takes an event Date instance and a billing Date instance and returns a boolean in those 
 * dates are within the same month and year
 * isEventDateInBillingMonth(new Date(2022, 3, 17), new Date(2022, 3, 12)) // => true
 * isEventDateInBillingMonth(new Date(2022, 3, 17), new Date(2021, 3, 12)) // => false
 * isEventDateInBillingMonth(new Date(2022, 3, 17), new Date(2022, 4, 12)) // => false
 *
 * Input type: Date, Date
 * Output type: Boolean
**/
const isEventDateInBillingMonth = (eventDate, billingDate) => {
  return eventDate.getUTCFullYear() === billingDate.getUTCFullYear() &&
  eventDate.getUTCMonth() === billingDate.getUTCMonth() 
}

/**
 * Takes a Date instance and returns a Date which is the first day
 * of that month. For example:
 *
 * firstDayOfMonth(new Date(2022, 3, 17)) // => new Date(2022, 3, 1)
 *
 * Input type: Date
 * Output type: Date
**/
function firstDayOfMonth(date) {
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), 1)
}

/**
 * Takes a Date object and returns a Date which is the last day of that month.
 *
 * lastDayOfMonth(new Date(2022, 3, 17)) // => new Date(2022, 3, 31)
 *
 * Input type: Date
 * Output type: Date
**/
function lastDayOfMonth(date) {
  return new Date(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)
}

/**
 * Takes a Date object and returns a Date which is the next day.
 * For example:
 *
 * nextDay(new Date(2022, 3, 17))  // => new Date(2022, 3, 18)
 * nextDay(new Date(2022, 3, 31))  // => new Date(2022, 4, 1)
 *
 * Input type: Date
 * Output type: Date
**/
function nextDay(date) {
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 1)
}

module.exports = monthlyCharge;
