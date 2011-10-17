var Express = require('express');
var Os = require('os');
var Config = require('./config');

var internals = {}

//email send to admin for server start

// listen to uncaught exception

// craete and configure server instance
exports.create = function(paths) {
   // handle server key and cert

    var server = (tls ? Express.createServer(tls) : Express.createServer()); 
    server.configure(function() {
        server.set('views', __dirname + '/views');
        server.set('view engine', 'jade');

        server.use(Express.bodyParser());
        server.use(Express.cookieParser());

        server.use(server.router);

        server.use(Express.static(__dirname + '/static'));
        server.use(internals.notFound);
        server.use(internals.errorHandler);
    });    

    for (var i = 0; i < paths.length; ++i) {

        internals.setRoute(server, paths[i]);
    }

    // Start Server

    server.listen(Config.host.web.port, Config.host.web.domain);
    Log.info('Web Server started at ' + Config.host.uri('web'));
};

// main set route utility for server configure
// pre filter and post filter invoked here
internals.setRoute = function(server, config) {
    var routes = [];
    switch (config.authentication) {
        case 'session': routes.push(internals.authenticate);
            break;
        default: break;
    }

    if (config.body) {
        routes.push(internals.validateData(config.body));
    }

    switch(config.method) {
        case 'GET':
            server.get(config.path, internals.preprocessRequest, routes, config.handler, internals.finalizedResponse);
            break;
        case 'POST':
            server.post(config.path, internals.preprocessRequest, routes, config.handler, internals.finalizedResponse);
            break;
        default:
            process.exit(1);
            break;
    }
};

// pre processor on the request
internals.preprocessRequest = function(req, res, next) {
    // user agent handling
    // check cookie
    // load session
        // stupid means sessionless
};
