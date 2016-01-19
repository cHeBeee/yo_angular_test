'use strict';

/**
 * @ngdoc directive
 * @name yomenTestApp.directive:scroller
 * @description
 * # scroller
 */
 angular.module('yomenTestApp')
 .directive('scroller', ['$rootScope', function ($rootScope) {
 	return {
      // template: '<div></div>',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        // element.text('this is the scroller directive');
        scope.elm = element; 
        // element[0].scrollTop = 1000;
        scope.elm.animate({ scrollTop : $rootScope.scrollPosition }, 1);

        element.on('scroll', function(val){
        	
        	$rootScope.scrollPosition = element.scrollTop();

        });
    }
};
}]);
