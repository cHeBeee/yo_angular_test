'use strict';

describe('Directive: uiSvg', function () {

  // load the directive's module
  beforeEach(module('yomenTestApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ui-svg></ui-svg>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the uiSvg directive');
  }));
});
