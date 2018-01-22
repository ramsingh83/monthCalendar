/**
 * @description : Controller for the calendar Component.
 * @param { service } calendarService Used to keep internal model of Calendar.
 * @param { provider } moment Used for date and time calculation and formating.
 */
function calendarController(
  calendarService,
  moment
) {

  const vm = this;
  const dateArray = [];
  const dateFormat = 'DD/MM/YYYY';
  let sdate = null;
  let daysInMonth = null;
  vm.numberOfDays = [];

  const options = calendarService.dateOptions;
  sdate = (vm.dateOptions) ? vm.dateOptions.dateFrom : options.dateFrom;
  vm.startDate = (vm.dateOptions) ? vm.dateOptions.dateFrom : options.dateFrom;
  vm.endDate = (vm.dateOptions) ? vm.dateOptions.dateTo : options.dateTo;
  vm.dateExclude = (vm.dateOptions) ? vm.dateOptions.datesExcluded : options.datesExcluded;
  vm.surcharge = (vm.dateOptions) ? vm.dateOptions.surcharge : options.surcharge;

  if (!vm.startDate && !vm.endDate) {

    vm.noDates = true;

  }

  /**
   * @description : Pad '0' on single digit.
   */
  function pad(n) {

    return (n < 10) ? (`0${n}`) : n;

  }

  /**
   * @description : Returns a list of dates between start and end date.
   * @param { string } startDate
   * @param { string } endDate
   */
  function getDateRange(startDate, endDate) {

    const dates = [];
    const currDate = moment(startDate, dateFormat);
    const lastDate = moment(endDate, dateFormat);
    let now = currDate.clone();

    while (now.isBefore(lastDate) || now.isSame(lastDate)) {

      dates.push(now.format(dateFormat));
      now = now.add(1, 'days');

    }

    return dates;

  }

  sdate = moment(sdate, dateFormat);
  // Get number of days in current month to bind with calendar.
  daysInMonth = moment(sdate).daysInMonth();
  // Get week days from config.
  vm.weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // Get current month name from given date.
  vm.monthName = sdate.format('MMMM');
  // Get current year from  given date.
  vm.yearName = sdate.format('YYYY');
  // Get  number of days before first date.
  const month = moment().month(vm.monthName).format('M') - 1;
  vm.dayName = moment(new Date(parseInt(vm.yearName, 10), month)).format('d');
  // Get a collection of dates in current month.
  for (let i = 0; i < daysInMonth; i++) {

    vm.numberOfDays.push(pad(i + 1));

  }

  // Get a collection of dates to disable excluded dates on caledar.
  const dateIncluded = getDateRange(vm.startDate, vm.endDate)
    .filter(obj => vm.dateExclude.indexOf(obj) === -1);

  angular.forEach(dateIncluded, (value) => {

    const dateStringArray = value.split('/');
    const currentDay = parseInt(dateStringArray[0], 10);
    if (parseInt(dateStringArray[1], 10) === parseInt(sdate.format('M'), 10)) {

      dateArray.push(pad(currentDay));

    }

  });

  /**
   * @description : Returns the number of empty day block for current month.
   */
  function getEmptyDayBlockNumber() {

    return new Array(parseInt(vm.dayName, 10));

  }

  /**
   * @description : Check current date day and returns surcharge accordingly.
   * @param { string } day
   */
  function getSurcharge(day) {

    const months = moment().month(vm.monthName).format('M') - 1;
    const currentDate = new Date(parseInt(vm.yearName, 10), months, parseInt(day, 10));
    const currentDay = vm.weekday[currentDate.getDay()].toLowerCase();
    let surcharge;
    if (currentDay === 'sat') {

      surcharge = vm.surcharge.weekend;

    } else if (currentDay === 'mon' || 'tue' || 'wed' || 'thu' || 'fri') {

      surcharge = vm.surcharge.weekday || '0';

    }

    return surcharge;

  }

  /**
   * @description : Check if passed date paresent in array.
   * @param { integer} day
   * @return { boolean}
   */
  function isDateActive(day) {

    return (dateArray.indexOf(day) > -1);

  }

  /**
   * @description : set choosen Date to model.
   * @param { integer} day
   * @return { boolean}
   */
  function selectDate(day) {

    if (isDateActive(day)) {

      vm.calendarService.calendarModel.day = day;
      vm.calendarService.calendarModel.month = vm.monthName;
      vm.calendarService.calendarModel.year = vm.yearName;
      vm.calendarService.calendarModel.surcharge = getSurcharge(day);

    }

  }

  vm.calendarService = calendarService;
  vm.isDateActive = isDateActive;
  vm.selectDate = selectDate;
  vm.getEmptyDayBlockNumber = getEmptyDayBlockNumber;
  vm.getSurcharge = getSurcharge;

}

export default calendarController;
