'use strict';

/**
 * @ngdoc directive
 * @name yomenTestApp.directive:uiSvg
 * @description
 * # uiSvg
 */
 angular.module('yomenTestApp')
 .directive('uiSvg', function ($rootScope, $http, $timeout) {
  return {
    // template: function(){
    //   // var template = '<div ng-if="blaa"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="about#i-emoticon-bangs-tongue-out-02"></use></svg></div>';
    //   // var template = '<div ng-bind-html="templ"></div>';
    //   var template = '<div ng-include="templ"></div>';
    //   return template;
    // },
    // templateUrl: '/images/futuramo-icons-2016-02-01.svg',
    restrict: 'E',
    compile: function compile(element, attr) {
      return {
        pre: function preLink( scope, element ) {
            
        },
        post: function postLink( scope, element ) {

          scope.templ;
          $http.get('/images/futuramo-icons-2016-02-01.svg').then(function(response) {
            scope.templ = response.data;
            
            $timeout(function(){
              element.replaceWith(scope.templ);
              console.info(scope.templ);
            }, 3000)
          });

          
        }
      };
    },
    link: function postLink(scope, element, attrs) {

    }
  };
});
