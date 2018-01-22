import angular from 'angular';

// Load components.
import calendarComponent from './components/calendar/calendar.component';

const componentsModule = angular
  .module('app.components', [])
  .component('calendarComponent', calendarComponent)
  .name;

export default componentsModule;
