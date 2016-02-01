'use strict';

describe('Service: svgService', function () {

  // load the service's module
  beforeEach(module('yomenTestApp'));

  // instantiate service
  var svgService;
  beforeEach(inject(function (_svgService_) {
    svgService = _svgService_;
  }));

  it('should do something', function () {
    expect(!!svgService).toBe(true);
  });

});
