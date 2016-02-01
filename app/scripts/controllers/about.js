'use strict';

/**
 * @ngdoc function
 * @name yomenTestApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the yomenTestApp
 */
angular.module('yomenTestApp')
  .controller('AboutCtrl', function ($scope, svgService, $timeout, $rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.setClik = function() {
    	$rootScope.blaa = !$rootScope.blaa;
    };

    // $timeout(function(){
    // 	$rootScope.blaa = true;
    // 	console.info( $rootScope.blaa );
    // },3000);
    // $scope.showIcons = svgService.showIcons;
  });
