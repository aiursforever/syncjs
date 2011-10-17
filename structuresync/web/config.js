exports.product = {
    name: 'structure sync'
};

exports.host = {
    web: {
        domain: 'localhost',
        port: 8000,
        scheme: 'http'
    },

    api: {
        domain: 'localhost',
        port: 8001,
        scheme: 'http'
    },

    uri: function (type) {

        var set = (type === 'web' ? exports.host.web : exports.host.api);
        return set.scheme + '://' + set.domain + (set.port ? ':' + set.port : ''
);
    },
    authority: function (type) {
        var set = (type === 'web' ? exports.host.web : exports.host.api);
        return set.domain + (set.port ? ':' + set.port : '');
    }
};

exports.process = {
    web: {
    },
    api: {
    }
};

exports.database = {

    host: '127.0.0.1',
    port: 27017,
    db: 'syncme'
};
