'use strict';

/**
 * @ngdoc function
 * @name yomenTestApp.controller:GalleryCtrl
 * @description
 * # GalleryCtrl
 * Controller of the yomenTestApp
 */
 angular.module('yomenTestApp')
 .controller('GalleryCtrl', function ($scope, $rootScope, $location, $routeParams, $timeout, $window, filterFilter) {

 	console.log('START GalleryCtrl');

 	this.awesomeThings = [
 	'HTML5 Boilerplate',
 	'AngularJS',
 	'Karma'
 	];

 	var chunk = function(arr, chunkSize) {
 		var result = [];
 		var index = 0;
 		for (var i = 0, len = arr.length; i < len; i += chunkSize) {
 			index++;
 			result.push(arr.slice(i,i+chunkSize));
 		}
 		return result;
 	};

	if ($routeParams.page) {
		$scope.currentPage = $routeParams.page;
	} else {
		$scope.currentPage = 0;
	}

 	// var _timeout;
 	var showPages = 1;
 	var itemsInPage = 40;
 	var distanceToAddMode = 5;

	var viewPortRec;
	var itemElementRec;
	var hNumItems;
	var vNumItems;
	var pageHight;
 	var topPage;
 	var pageRanges = [];
 	var initPage = $scope.currentPage;
	
	$scope.items = [];

	var unWatch = $scope.$watch('currentPage', function(newValue, oldValue){
		if (newValue === oldValue || $rootScope.iconsPreview.searchQuery.length > 0) {
			return;
		}
		console.log('CHANGE LINK ', newValue, oldValue);
		$location.updatePath('/gallery/' + newValue);
	});

	$scope.updateSearch = function() {
	 	showPages = 1;
	 	$scope.currentPage = initPage = 0; 
	 	scrollElement.scrollTop = 0;
		setPages();
	};

	$scope.goToPage = function(index) {
	 	showPages = 1;
		$scope.currentPage = initPage = index;
	 	scrollElement.scrollTop = 1;
	 	setPages();
	};

	var getItems = function() {
		return filterFilter($rootScope.apiData.licensesInfo.icons.extra.meta, $rootScope.iconsPreview.searchQuery);
	};

 	var setPages = function() {	
 		$scope.items = getItems();
	 	var i = 0;
	 	var arr = [];
	 	while (i < $scope.items.length) {
	 		arr.push(i++);
	 	}
	 	$scope.pages = chunk(arr, itemsInPage);
	 	if ($scope.pages[$scope.currentPage]) { 		
		 	$scope.rangeModel = {
		 		from: $scope.pages[$scope.currentPage][0],
		 		to: $scope.pages[$scope.currentPage][$scope.pages[$scope.currentPage].length-1] + 1,	
		 	};
		 	$scope.items = $scope.items.slice($scope.rangeModel.from, $scope.rangeModel.to);
	 	}
 	};
 	setPages();
 	
	if (parseInt($routeParams.page) > $scope.pages.length) {
		$location.path('/');
		$scope.currentPage = 0;
		return;
	}

 	var scrollElement = angular.element(document)[0].getElementById('gallery');
 	if ($scope.currentPage > 0) {
 		$timeout(function(){
 			scrollElement.scrollTop = distanceToAddMode + 10;
 		});
 	}

 	var updateWindowSize = function() {
 		viewPortRec = angular.element(document)[0].getElementById('gallery').getBoundingClientRect();
 		itemElementRec = angular.element(document)[0].getElementsByClassName('mid')[0].getBoundingClientRect();
 		hNumItems =  Math.floor(viewPortRec.width / itemElementRec.width);
 		vNumItems =  itemsInPage / hNumItems;
 		pageHight =  vNumItems * itemElementRec.height;

 		for (var j = 0; j < 100; j++) {
 			pageRanges[j] = Math.floor(((pageHight) * (j+1)));
 		}
 	};

 	var updateScroll = function() {

 		if (!viewPortRec) {
 			return;
 		}

 		var scrollTop = Math.floor(scrollElement.scrollTop);
 		var top = distanceToAddMode;
 		var bottom = Math.floor(((pageHight * showPages) - viewPortRec.height) - distanceToAddMode);
 			topPage = Math.floor(pageHight * initPage);

 		if ( scrollTop <= top && $scope.currentPage > 0 ) {
 			addTopPage();
 			return;
 		}
 		if ( scrollTop >= bottom ) {
 			addBottomPage();
 			return;
 		}

 		var k = initPage;
 		while ( scrollTop + topPage > pageRanges[k] - viewPortRec.height/2 ) {
 			k++;
 		}
 		$scope.currentPage = k;
 		$scope.$apply();
 		
 		// if ( scrollTop + topPage > pageRanges[k] ) {
			// nextPage();
			// return;
 		// }
 		// if ( scrollTop + topPage + pageHight < pageRanges[k] ) {
			// prevPage();
			// return;
 		// }
	};
	// var nextPage = function() {
 // 		$scope.currentPage++;
 // 		console.log('NEXT ITEMS');
	// };	

	// var prevPage = function() {
	// 	$scope.currentPage--;
	// 	if ($scope.currentPage < 0) {
	// 		$scope.currentPage = 0;
	// 	}
	// 	console.log('PREV ITEMS');
	// };

	var addTopPage = function() {
		$scope.rangeModel.from -= itemsInPage;
		if ($scope.rangeModel.from < 0) {
			$scope.rangeModel.from = 0;
			return;
		}
		initPage--;
		showPages++;
		$scope.items = getItems().slice($scope.rangeModel.from, $scope.rangeModel.to);
		$scope.$apply();
		scrollElement.scrollTop = pageHight;
	};

	var addBottomPage = function() {
		$scope.rangeModel.to += itemsInPage;
		if ($scope.rangeModel.to > $scope.pages[$scope.pages.length-1][$scope.pages[$scope.pages.length-1].length-1] ) {
			$scope.rangeModel.to = $scope.pages[$scope.pages.length-1][$scope.pages[$scope.pages.length-1].length-1] + 1;
			return;
		}
		showPages++;
		$scope.items = getItems().slice($scope.rangeModel.from, $scope.rangeModel.to);
		$scope.$apply();
	};

	angular.element($window).bind('resize', updateWindowSize);
	angular.element(scrollElement).on('scroll', function(){
		// if (_timeout) {
		// 	$timeout.cancel(_timeout);
		// }
		// _timeout = $timeout(function() {
		// 	_timeout = null;
			updateScroll();
		// }, 100);
	});

	$timeout(function(){
		updateWindowSize();
	});

	$scope.$on('$destroy', function() {
		unWatch();
		angular.element(scrollElement).off('scroll');
		angular.element($window).unbind('resize');
		console.log('END GalleryCtrl');
	});
});