'use strict';

angular
  .module('my-app')
  .controller('homepageCtrl', ['$scope', function ($scope) {
    $scope.text = "Homepage works!"
  }])
