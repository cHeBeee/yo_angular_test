'use strict';

/**
 * @ngdoc overview
 * @name yomenTestApp
 * @description
 * # yomenTestApp
 *
 * Main module of the application.
 */
angular
  .module('yomenTestApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    // 'dc.endlessScroll'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })      
      .when('/gallery/:page?', {
        templateUrl: 'views/gallery.html',
        controller: 'GalleryCtrl',
        controllerAs: 'gallery',
        // reloadOnSearch: false
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        controllerAs: 'contact'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
        // todo: would be proper to change this to decorators of $location and $route
        $location.updatePath = function (path, keep_previous_path_in_history) {
          if ($location.path() == path) return;

          var routeToKeep = $route.current;
          $rootScope.$on('$locationChangeSuccess', function () {
            if (routeToKeep) {
              $route.current = routeToKeep;
              routeToKeep = null;
            }
          });

          $location.path(path);
          if (!keep_previous_path_in_history) $location.replace();
        };

    // var chunk = function(arr, chunkSize) {
    //   var R = [];
    //   for (var i=0,len=arr.length; i<len; i+=chunkSize)
    //     R.push(arr.slice(i,i+chunkSize));
    //   return R;
    // };


    $rootScope.apiData = {
      licensesInfo: {
        icons: {
          extra: {
            meta: []
          }
        }
      }
    };
    $rootScope.iconsPreview = {
      searchQuery: '',
      style: '',
      currentPage: 0,
    };

    for (var i = 0; i < 1000; i++) {
      var item = { 
        'id': i,
        'name': 'name-' + i,
        'tags': 'tags-' + Date.now(),
        'seqHash': '#' + i
      };
      $rootScope.apiData.licensesInfo.icons.extra.meta.push(item);
    };

    // $rootScope.galleryItemsPage = chunk($rootScope.galleryItems, 20);
    // $rootScope.galleryItems = [];

    // $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      
    //     $rootScope.currentPage = next.params.page;

    //     for (var i = 0; i <  $rootScope.galleryItemsPage[$rootScope.currentPage].length; i++) {
    //       $rootScope.galleryItems.push($rootScope.galleryItemsPage[$rootScope.currentPage][i]);
    //     };

    //   console.log($rootScope.galleryItems.length);
    //   //event.stopPropagation();  //if you don't want event to bubble up 
    // });   

}]);
