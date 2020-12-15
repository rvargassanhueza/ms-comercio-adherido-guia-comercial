'use strict';
const joi = require('joi');

module.exports = joi.object().keys({
    
	nombre_tipo_formulario:joi.string().max(50).required(),
    descripcion_tipo_formulario:joi.string().max(100)
});