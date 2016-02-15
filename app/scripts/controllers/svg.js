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
    $scope.strokeWidth = 0;

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



    // $scope.roundedPath = 'M0 0 L 64 0 L64 64 L 0 64 Z';

    $scope.roundingTestCase = 'M0 0 L 64 0 L64 64 L 0 64 Z';
    $scope.roundingTestCaseM = 'M0 0 L 64 0 L64 64 L 0 64 Z';
    $scope.config = {
      rounding: 0.1,
      fractional: false,
      inner: 62
    };


    //http://stackoverflow.com/questions/12115691/svg-d3-js-rounded-corner-on-one-corner-of-a-rectangle/12124192#12124192
     $scope.rightRoundedRectTwo = function (x, y, w, h, r, tl, tr, bl, br) {
      var retval;
      retval  = "M" + (x + r) + "," + y;
      retval += "h" + (w - 2*r);
      if (tr) { retval += "a" + r + "," + r + " 0 0 1 " + r + "," + r; }
      else { retval += "h" + r; retval += "v" + r; }
      retval += "v" + (h - 2*r);
      if (br) { retval += "a" + r + "," + r + " 0 0 1 " + -r + "," + r; }
      else { retval += "v" + r; retval += "h" + -r; }
      retval += "h" + (2*r - w);
      if (bl) { retval += "a" + r + "," + r + " 0 0 1 " + -r + "," + -r; }
      else { retval += "h" + -r; retval += "v" + -r; }
      retval += "v" + (2*r - h);
      if (tl) { retval += "a" + r + "," + r + " 0 0 1 " + r + "," + -r; }
      else { retval += "v" + -r; retval += "h" + r; }
      retval += "z";
      return retval;
    }

    $scope.updateRoudn = function() {

      $scope.config.rounding = ($scope.strokeRound - 0)/(32-0);

      /* jshint ignore:start */
      $scope.roundedPath = roundPathCorners(
        $scope.roundingTestCase, 
        // $scope.config.fractional ? $scope.config.rounding : $scope.config.rounding * 30,
        $scope.strokeRound,
        $scope.config.fractional
      );

      $scope.roundingTestCaseM = 'M0 0 L ' + $scope.config.inner + ' 0 L' + $scope.config.inner + ' ' + $scope.config.inner + ' L 0 ' + $scope.config.inner + ' Z';

      $scope.roundedPathM = roundPathCorners(
        $scope.roundingTestCaseM, 
        ($scope.config.rounding * 30) - $scope.strokeWidth,
        $scope.config.fractional
      );
      /* jshint ignore:end */

      $scope.roundedPathTwo = $scope.rightRoundedRectTwo(0, 0, 64, 64, $scope.strokeRound, 100, 100, 100, 100);

    };
    $scope.updateRoudn();


    $scope.rightRoundedRect = function(x, y, width, height, radius) {
      return "M" + x + "," + y
          + "h" + (width - radius)
          + "a" + radius + "," + radius + " 0 0 1 " + radius + "," + radius
          + "v" + (height - 2 * radius)
          + "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + radius
          + "h" + (radius - width)
          + "a" + radius + "," + radius + " 0 0 1 " + radius + "," + -radius
          + "v" + (height - 2 * radius)
          + "z";
    };

  });