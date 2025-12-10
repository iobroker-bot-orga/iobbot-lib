/* jshint -W097 */
/* jshint strict: false */
/* jslint node: true */
'use strict';

/**
 * @file Functions for retrieving ioBroker repository data from download.iobroker.net
 * This module provides caching access to stable and latest repository data.
 */

// URL constants for ioBroker repositories
const IOBROKER_SOURCES_LATEST = 'https://download.iobroker.net/sources-dist-latest.json';
const IOBROKER_SOURCES_STABLE = 'https://download.iobroker.net/sources-dist.json';

// Default headers for fetch requests - disable caching and set authentication
const DEFAULT_HEADERS = {
    Authorization: process.env.IOBBOT_GITHUB_TOKEN ? `token ${process.env.IOBBOT_GITHUB_TOKEN}` : 'none',
    'User-Agent': 'Action script',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
};

// Default timeout for HTTP requests (in milliseconds)
const DEFAULT_TIMEOUT = 30000;

const context = {};

/**
 * @function fetchWithTimeout
 *
 * Helper function to make HTTP requests using native fetch with timeout support.
 *
 * @param {string} url - URL to fetch
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise<object>} returns parsed JSON response
 */
async function fetchWithTimeout(url, timeout = DEFAULT_TIMEOUT) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            headers: DEFAULT_HEADERS,
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP error retrieving ${url}, status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}

/**
 * @function getLatestRepo
 *
 * This function retrieves the current latest repository data from download.iobroker.net and caches the information returned.
 * It returns the complete unfiltered repository json.
 *
 * @returns {object} returns repository json as retrieved from download.iobroker.net.
 */
async function getLatestRepo() {
    if (!context.latestRepoLive) {
        const url = IOBROKER_SOURCES_LATEST;
        try {
            console.log(`retrieving "${url}"`);
            const body = await fetchWithTimeout(url);
            if (body) {
                context.latestRepoLive = body;
            } else {
                console.log(`Error: cannot download "${url}"`);
                throw `Cannot download "${url}"`;
            }
        } catch (e) {
            console.log(`Error: cannot download "${url}"`);
            throw e;
        }
    }
    return context.latestRepoLive;
}

/**
 * @function getStableRepo
 *
 * This function retrieves the current stable repository data from download.iobroker.net and caches the information returned.
 * It returns the complete unfiltered repository json.
 *
 * @returns {object} returns repository json as retrieved from download.iobroker.net.
 */
async function getStableRepo() {
    if (!context.stableRepoLive) {
        const url = IOBROKER_SOURCES_STABLE;
        try {
            console.log(`retrieving "${url}"`);
            const body = await fetchWithTimeout(url);
            if (body) {
                context.stableRepoLive = body;
            } else {
                console.log(`Error: cannot download "${url}"`);
                throw `Cannot download "${url}"`;
            }
        } catch (e) {
            console.log(`Error: cannot download "${url}"`);
            throw e;
        }
    }

    return context.stableRepoLive;
}

exports.IOBROKER_SOURCES_LATEST = IOBROKER_SOURCES_LATEST;
exports.IOBROKER_SOURCES_STABLE = IOBROKER_SOURCES_STABLE;
exports.getLatestRepo = getLatestRepo;
exports.getStableRepo = getStableRepo;
