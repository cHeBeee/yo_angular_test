'use strict';

/**
 * @ngdoc service
 * @name yomenTestApp.svgService
 * @description
 * # svgService
 * Service in the yomenTestApp.
 */
angular.module('yomenTestApp')
  .service('svgService', function ($timeout) {
    // AngularJS will instantiate a singleton by calling "new" on this function

	this.setShowIcons = function(val) {
    	return val;
	}

  });
