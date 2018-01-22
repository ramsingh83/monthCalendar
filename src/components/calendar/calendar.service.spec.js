import app from '../../main.module';

describe('Service: calendarService', () => {

  let calendarService;
  const separator = '/';

  beforeEach(() => {

    angular.mock.module(app);

    angular.mock.inject((_calendarService_) => {

      calendarService = _calendarService_;

    });

  });

  it('Should return a valid date.', () => {

    calendarService.calendarModel.day = '21';
    calendarService.calendarModel.month = '01';
    calendarService.calendarModel.year = '2018';
    expect(calendarService.getselectedDate()).toBe('21/01/2018');

  });

  it('Should return surchage for selected date.', () => {

    calendarService.calendarModel.surcharge = 12;
    expect(calendarService.getSurcharge()).toBe(12);

  });

});