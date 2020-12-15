'use strict';
const joi = require('joi');

module.exports = joi.object().keys({
    monto_credito: joi.number().integer().required(),
    nuevo: joi.boolean().required(),

    red_id: joi.number().integer().positive().default(null),
    automotora_id: joi.number().integer().positive().default(null),
    local_id: joi.number().integer().positive().default(null),

    marca_id: joi.number().integer().positive().default(null),
    modelo_id: joi.number().integer().positive().default(null),

    producto_id: joi.number().integer().positive().required(),
    subproducto_id: joi.number().integer().positive().required(),    
    canal_id: joi.number().integer().positive().required(),
    clasificacion_cliente_id: joi.number().integer().positive().required(),
    fecha: joi.date().min('now'),
});