'use strict';

/**
 * @ngdoc function
 * @name yomenTestApp.controller:SvgCtrl
 * @description
 * # SvgCtrl
 * Controller of the yomenTestApp
 */
angular.module('yomenTestApp')
  .controller('SvgCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.strokeRound = 8;
    $scope.strokeWidth = 12;

     $scope.getRoundOne = function(round) {
       // return parseInt(round) + ($scope.strokeWidth / (parseInt(round)/2));
       return round;
     };

     $scope.getRoundCorners = function(round, size) {
      var val;
      if (round - (size/2) < 0) {
        val = 0;
      } else {
        val = round - (size/2);
      }
      console.info(val);
      return val;
    };

    $scope.getPathArray = function ( path ) {
      var paths = path.split( /z|Z/ );
      var points = [];
      var j;
      for ( var i = 0; i < paths.length-1; i++ ) {
        path = paths[i].split( /l|L/ );
        path[0] = path[0].replace( /m|M/, '' );
        for ( j in path ) {
          path[j] = path[j].split( ',' );
          for ( var k in path[j] ) {
            path[j][k] = parseFloat( path[j][k] );
            if ( j !== 0 ) {
              path[j][k] += path[j-1][k];
            }
          }
        }
        for ( j in path ) {
          path[j] = path[j].join( ',' );
        }
        points[i] = path.join( ' ' );
      }
      return points;
    };



    $scope.roundedPath = 'M0 0 L 64 0 L64 64 L 0 64 Z';

    $scope.roundingTestCase = 'M0 0 L 64 0 L64 64 L 0 64 Z';
    $scope.config = {
      rounding: 0.1,
      fractional: false
    };

    /* jshint ignore:start */
    $scope.roundedPath = roundPathCorners(
      $scope.roundingTestCase, 
      $scope.config.fractional ? $scope.config.rounding : $scope.config.rounding * 100,
      $scope.config.fractional
      );
    /* jshint ignore:end */
  });