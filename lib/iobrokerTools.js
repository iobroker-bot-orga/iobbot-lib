/* jshint -W097 */
/* jshint strict: false */
/* jslint node: true */
'use strict';

/**
 * @file Tools for processing ioBroker adapter data
 * This module provides functions for extracting and processing adapter information.
 */

const repositories = require('./iobrokerRepositories.js');

const context = {};

/**
 * @function extractAdapterName
 *
 * This function extracts the adaptername (without ioBroker) from an url pointing to an adapter repository.
 *
 * @param {string} url - url of an adapter repository.
 *
 * @returns {string} returns the extracted adapter name
 */
function extractAdapterName(url) {
    //`https://www.github.com/${user}/ioBroker.${adapter}`;
    return url.split('/')[4].split('.')[1];
}

/**
 * @function getLatestAdapters
 *
 * This function returns an array of objects for adapters listed at latest repository.
 *
 * @returns {array} returns an array of adapter-objects for adapters listed at latest repository.
 */
async function getLatestAdapters() {
    if (!context.latestAdapters) {
        const repoAdapters = await repositories.getLatestRepoLive();
        const adapters = {};
        for (const adapter in repoAdapters) {
            if (adapter === '_repoInfo') {
                continue;
            }
            //"meta": "https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/packages/controller/io-package.json
            const meta = repoAdapters[adapter].meta;
            if (!meta) {
                console.log(`warning: adapter ${adapter} does not specify 'meta' attribute`);
                continue;
            }
            const user = meta.split('/')[3];
            adapters[adapter] = {};
            adapters[adapter].githubUrl = `https://www.github.com/${user}/ioBroker.${adapter}`;
            adapters[adapter].user = user;
            adapters[adapter].version = repoAdapters[adapter].version;
            adapters[adapter].published = repoAdapters[adapter].published; // @npmjs.com
            adapters[adapter].versionDate = repoAdapters[adapter].versionDate; // @npmjs.com
        }
        context.latestAdapters = adapters;
    }
    return context.latestAdapters;
}

/**
 * @function getStableAdapters
 *
 * This function returns an array of objects for adapters listed at stable repository.
 *
 * @returns {array} returns an array of adapter-objects for adapters listed at stable repository.
 */
async function getStableAdapters() {
    if (!context.stableAdapters) {
        const repoAdapters = await repositories.getStableRepoLive();
        const adapters = {};
        for (const adapter in repoAdapters) {
            if (adapter === '_repoInfo') {
                continue;
            }
            //"meta": "https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/packages/controller/io-package.json
            const meta = repoAdapters[adapter].meta;
            if (!meta) {
                console.log(`warning: adapter ${adapter} does not specify 'meta' attribute`);
                continue;
            }
            const user = meta.split('/')[3];
            adapters[adapter] = {};
            adapters[adapter].githubUrl = `https://www.github.com/${user}/ioBroker.${adapter}`;
            adapters[adapter].user = user;
            adapters[adapter].version = repoAdapters[adapter].version;
            adapters[adapter].published = repoAdapters[adapter].published; // @npmjs.com
            adapters[adapter].versionDate = repoAdapters[adapter].versionDate; // @npmjs.com
        }
        context.stableAdapters = adapters;
    }
    return context.stableAdapters;
}

/**
 * @function getAdapterUrls
 *
 * This function returns an array of adapter urls listed at latest repository.
 *
 * @param {array} adapters - array of adapterobjects returned by get*Adapters;
 *
 * @returns {array} returns an array of adapter urls listed at latest repository.
 */
async function getAdapterUrls(adapters) {
    const adapterUrls = [];
    for (const adapter in adapters) {
        console.log(`adding ${adapters[adapter].githubUrl}`);
        adapterUrls.push(adapters[adapter].githubUrl);
    }

    return adapterUrls;
}

// export
exports.extractAdapterName = extractAdapterName;
exports.getAdapterUrls = getAdapterUrls;
exports.getLatestAdapters = getLatestAdapters;
exports.getStableAdapters = getStableAdapters;
