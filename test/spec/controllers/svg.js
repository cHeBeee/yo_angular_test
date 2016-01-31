'use strict';

describe('Controller: SvgCtrl', function () {

  // load the controller's module
  beforeEach(module('yomenTestApp'));

  var SvgCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SvgCtrl = $controller('SvgCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SvgCtrl.awesomeThings.length).toBe(3);
  });
});
