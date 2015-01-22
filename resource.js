/*!
 * Resource module.
 *
 * Copyright (c) 2012-2015 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
define([
  'angular',
  './refresh-service',
  './resource-service'
], function(
  angular,
  refreshService,
  resourceService) {

'use strict';

var module = angular.module('app.resource', []);

module.service(refreshService);
module.service(resourceService);

return module.name;

});
