/*!
 * Resource module.
 *
 * Copyright (c) 2012-2017 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
import angular from 'angular';
import RefreshService from './refresh-service.js';
import ResourceService from './resource-service.js';

var module = angular.module('bedrock.resource', []);

module.service('brRefreshService', RefreshService);
module.service('brResourceService', ResourceService);
