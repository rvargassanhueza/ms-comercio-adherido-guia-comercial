'use strict';
var methods = require('../../src/controllers/tipo-formulario-methods');

module.exports.register = (server) => {
    server.get({
        path: '/tipo-formulario/',
        version: '1.0.0'
    },
        methods.get
    );
    server.get({
        path: '/tipo-formulario/:id',
        version: '1.0.0'
    },
    methods.getId
    );

    server.post({
        path: '/tipo-formulario/',
        version: '1.0.0',
        validation: {
            params: require('../../src/validators/formularios/tipo-formularios/insert')
        },
    },
    methods.insertTipoForm
    );

    server.put({
        path: '/tipo-formulario/:id',
        version: '1.0.0',
        validation: {
            params: require('../../src/validators/formularios/tipo-formularios/insert')
        },
    },
    methods.updateTipoForm
    );

    server.del({
        path: '/tipo-formulario/:id',
        version: '1.0.0'
    },
    methods.deleteTipoForm
    );
}