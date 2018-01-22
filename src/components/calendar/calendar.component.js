import calendarController from './calendar.controller';
import calendarView from './calendar.view.html';

const calendarComponent = {
  template: calendarView,
  controller: calendarController,
  controllerAs: 'vm',
  bindings: {
    dateOptions: '<'
  }
};

export default calendarComponent;
