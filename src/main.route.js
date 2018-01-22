// TODO: Remove when home component is generated
import calendarComponent from './components/calendar/calendar.component';

function routeConfig($routeProvider) {

  $routeProvider
    .when('/', calendarComponent)
    .otherwise({
      redirectTo: '/'
    });

}

export default routeConfig;
