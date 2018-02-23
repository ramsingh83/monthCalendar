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

  /**
   * @description: Returns selected Date from calendar.
   */
  function getselectedDate() {

    return calendarModel.day + separator + calendarModel.month + separator + calendarModel.year;

  }

  /**
   * @description: Reset the object properties.
   */
  function clearRedeliveryDate() {

    calendarModel.day = '';
    calendarModel.month = '';
    calendarModel.year = '';
    calendarModel.surcharge = 0;

  }

  /**
   * @description: Return surcharge for selected Date.
   */
  function getSurcharge() {

    return calendarModel.surcharge;

  }

  /**
   * @description: Set the options to dateOptions object.
   * @param options
   */
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
