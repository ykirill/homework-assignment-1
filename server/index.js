/**
 * Create http server instance, and export it.
 */

// DEPENDENCIES.
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

// Router handlers.
const handlers = {};

// Hello handler.
handlers.hello = (data, callback) => {
    callback(200, {message: 'Hello, friend!'});
};

// Not found handler.
handlers.notFound = (data, callback) => {
    callback(404, {message: 'Sorry, here is nothing to see.'});
};

// Routes list.
const routes = {
    hello: handlers.hello
};

// Server callback.
const serverCallback = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+\$/g, '');
    const query = parsedUrl.query;
    const headers = req.headers;
    const method = req.method.toUpperCase();
    const decoder = new StringDecoder('utf-8');
    let buffer = '';

    req.on('data', (data) => {
        buffer += decoder.write(data);
    });

    req.on('end', () => {
        buffer += decoder.end();

        const chosenHandler = typeof(routes[trimmedPath]) !== 'undefined' ?
            routes[trimmedPath] : handlers.notFound;

        const data = {
            method,
            headers,
            path: trimmedPath,
            query,
            payload: buffer,
        };

        chosenHandler(data, (statusCode, payload) => {
            const status = typeof(statusCode) === 'number' ?
                statusCode : 200;
            const data = typeof(payload) === 'object' ?
                payload : {};
            const dataString = JSON.stringify(data);

            res.setHeader('Content-Type', 'application/json');
            res.writeHead(status);
            res.end(dataString);

            console.log(`Server respond with status: ${status} on request to /${trimmedPath}`);
        })
    });
};

// Export server.
module.exports = http.createServer(serverCallback);