import angular from 'angular';
import ngRoute from 'angular-route';
import ngSanitize from 'angular-sanitize';
import moment from 'angular-moment';

// Import configs
import routeConfig from './main.route';

// Import Modules
import componentsModule from './components.module';

// Import Services (local).
import calendarService from './components/calendar/calendar.service';

// Import Utils.
import bootstrap from './utils/bootstrap';

// Import main SCSS file
import './scss/main.scss';

const calendar = angular.module('app', [ngRoute, ngSanitize, componentsModule, moment])
  .config(routeConfig)
  .service('calendarService', calendarService)
  .name;

// e.g. for use in tests
export default calendar;

bootstrap();
