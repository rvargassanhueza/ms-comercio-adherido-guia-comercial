'use strict';
var methods = require('../../src/controllers/comercio-adherido-methods');

module.exports.register = (server) => {
    server.get({
        path: '/comercioAdherido/',
        version: '1.0.0'
    },
        methods.get
    );
    server.get({
        path: '/comercioAdherido/:id',
        version: '1.0.0'
    },
    methods.getId
    );

    server.get({
        path: '/comercioAdherido/categoria/:idCategoria',
        version: '1.0.0'
    },
    methods.getComAdhCategoriaId
    );

    server.post({
        path: '/comercioAdherido/',
        version: '1.0.0',
        validation: {
            // params: require('../../src/validators/comercioAdherido/insert')
        },
    },
    methods.insertComAdh
    );

    server.put({
        path: '/comercioAdherido/:id',
        version: '1.0.0',
        validation: {
            // params: require('../../src/validators/comercioAdherido/insert')
        },
    },
    methods.updateComAdh
    );

    server.del({
        path: '/comercioAdherido/:id',
        version: '1.0.0'
    },
    methods.deleteComAdh
    );
}