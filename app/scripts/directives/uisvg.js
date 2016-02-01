'use strict';

/**
 * @ngdoc directive
 * @name yomenTestApp.directive:uiSvg
 * @description
 * # uiSvg
 */
angular.module('yomenTestApp')
  .directive('uiSvg', function ($rootScope, svgService) {
    return {
      template: function(){
      	var template = '<div ng-if="blaa"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="about#i-emoticon-bangs-tongue-out-02"></use></svg></div>';
      	return template;
      },
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        
        $rootScope.$watch('svgService.showIcons', function(){
          console.info('assada')
        });

      }
    };
  });
