'use strict';

angular.module('my-app')
  .component('myComponent', {
    templateUrl: 'templates/myComponent/myComponent.html',
    controllerAs: 'ctrl',
    controller: ['$scope', function($scope){
      let ctrl = this;
    }]
  });
