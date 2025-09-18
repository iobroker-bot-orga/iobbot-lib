/* jshint -W097 */
/* jshint strict: false */
/* jslint node: true */
'use strict';

/**
 * @fileoverview Functions for retrieving ioBroker repository data from iobroker.live
 * This module provides caching access to stable and latest repository data.
 */

const axios = require('axios');

// disable axios caching
axios.defaults.headers = {
    'Authorization': process.env.IOBBOT_GITHUB_TOKEN ? `token ${process.env.IOBBOT_GITHUB_TOKEN}` : 'none',
    'user-agent': 'Action script',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0'
};

const context = {};

/**
 * @function getLatestRepoLive
 *
 * This function retrieves the current latest repository data from iobroker.live and caches the information returned.
 * It returns the complete unfiltered repository json.
 *
 * @returns {object} returns repository json as retrieved from iobroker.live.
 */
async function getLatestRepoLive() {
    if ( !context.latestRepoLive ) {
        const url = 'http://repo.iobroker.live/sources-dist-latest.json';
        try {
            console.log(`retrieving "${url}"`);
            const _response = await axios(url);
            const body = _response.data;
            if (body) {
                context.latestRepoLive = body;
            } else {
                console.log(`Error: cannot download "${url}"`);
                throw( `Cannot download "${url}"` );
            }
        } catch (e) {
            console.log(`Error: cannot download "${url}"`);
            throw e;
        }
    }
    return context.latestRepoLive;
}

/**
 * @function getStableRepoLive
 *
 * This function retrieves the current stable repository data from iobroker.live and caches the information returned.
 * It returns the complete unfiltered repository json.
 *
 * @returns {object} returns repository json as retrieved from iobroker.live.
 */
async function getStableRepoLive() {
    if ( !context.stableRepoLive ) {
        const url = 'http://repo.iobroker.live/sources-dist.json';
        try {
            console.log(`retrieving "${url}"`);
            const _response = await axios(url);
            const body = _response.data;
            if (body) {
                context.stableRepoLive = body;
            } else {
                console.log(`Error: cannot download "${url}"`);
                throw( `Cannot download "${url}"` );
            }
        } catch (e) {
            console.log(`Error: cannot download "${url}"`);
            throw e;
        }
    }

    return context.stableRepoLive;
}

exports.getLatestRepoLive = getLatestRepoLive;
exports.getStableRepoLive = getStableRepoLive;

