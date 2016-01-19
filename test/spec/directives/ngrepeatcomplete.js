'use strict';

describe('Directive: ngRepeatComplete', function () {

  // load the directive's module
  beforeEach(module('yomenTestApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ng-repeat-complete></ng-repeat-complete>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ngRepeatComplete directive');
  }));
});
