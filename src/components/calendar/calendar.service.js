/**
 * @decription : Used to keep an internal model of calendar.
 */
function calendarService() {

  const calendarModel = {
    day: '',
    month: '',
    year: '',
    surcharge: 0
  };

  let dateOptions = {
    dateFrom: '01/01/2018',
    dateTo: '30/01/2018',
    datesExcluded: ['12/01/2018', '13/01/2018', '18/01/2018'],
    surcharge: {
      weekend: 10,
      weekday: 5
    }
  };
  const separator = '/';

  function getselectedDate() {

    return calendarModel.day + separator + calendarModel.month + separator + calendarModel.year;

  }

  function clearRedeliveryDate() {

    calendarModel.day = '';
    calendarModel.month = '';
    calendarModel.year = '';
    calendarModel.surcharge = 0;

  }

  function getSurcharge() {

    return calendarModel.surcharge;

  }

  function setDateOptions(options) {

    dateOptions = options;

  }

  return {

    calendarModel: calendarModel,
    dateOptions: dateOptions,
    getselectedDate: getselectedDate,
    getSurcharge: getSurcharge,
    clearRedeliveryDate: clearRedeliveryDate,
    setDateOptions: setDateOptions

  };

}

export default calendarService;
