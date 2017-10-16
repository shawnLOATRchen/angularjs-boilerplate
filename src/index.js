angular.module('my-app', ['ngRoute'])
  .config(['$routeProvider', '$locationProvider',
    ($routeProvider, $locationProvider) => {
    $locationProvider.hashPrefix('');

    $routeProvider
      .when('/', {
        templateUrl: 'templates/homepage.html',
        controller: 'homepageCtrl'
      })
  }])
