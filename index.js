/* jshint -W097 */
/* jshint strict: false */
/* jslint node: true */
'use strict';

/**
 * @file ioBroker bot support library for ioBroker access
 * This module provides functions to retrieve and process ioBroker repository and adapter data.
 */

const iobrokerTools = require('./lib/iobrokerTools.js');
const iobrokerRepositories = require('./lib/iobrokerRepositories.js');

console.log('module has been loaded successfully');

// Export functions
exports.extractAdapterName = iobrokerTools.extractAdapterName;
exports.getAdapterUrls = iobrokerTools.getAdapterUrls;
exports.getLatestAdapters = iobrokerTools.getLatestAdapters;
exports.getLatestRepoLive = iobrokerRepositories.getLatestRepoLive;
exports.getStableAdapters = iobrokerTools.getStableAdapters;
exports.getStableRepoLive = iobrokerRepositories.getStableRepoLive;
