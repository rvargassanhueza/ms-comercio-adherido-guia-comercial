'use strict';
const joi = require('joi');
const rutValidacion = require('./../rutExtend');

module.exports = joi.object().keys({

data:{ 
        persona: {
                id_usuario:joi.number().integer().required(),
                rut_persona:rutValidacion.RutValidacion().RutValido().default(null).allow(null),
                nombre_completo_persona:joi.string().default(null).allow(null),
                correo_persona:joi.string().email().default(null).allow(null),
                telefono_persona:joi.string().default(null).allow(null),
        },
        direccion: { 
                id_comuna: joi.number().integer().default(347).required(),
                calle_direccion: joi.string().allow(null).default(null),
                numero_direccion: joi.number().integer().allow(null).default(null),
                observacion_direccion: joi.string().allow(null).default(null),
                cod_postal: joi.number().integer().allow(null).default(null),
            },
        formulario: { 
                id_tipo_formulario: joi.number().integer().required(),
                id_cliente: joi.number().integer().required(),
                nombre_formulario: joi.string().allow(null).default(null),
                descripcion_formulario: joi.string().allow(null).default(null),
                nombre_sitio_web: joi.string().allow(null).default(null),
                nuevo_valor_vehiculo: joi.number().integer().allow(null).default(null),
                antiguo_valor_vehiculo: joi.number().integer().allow(null).default(null),
                valor_bono_vehiculo: joi.number().integer().allow(null).default(null),
                valor_pie_vehiculo: joi.number().integer().allow(null).default(null),
                valor_cuota: joi.number().integer().allow(null).default(null),
                valor_matricula: joi.number().integer().allow(null).default(null),
                id_marca_vehiculo: joi.number().integer().allow(null).default(null),
                id_modelo_vehiculo: joi.number().integer().allow(null),
                id_concesionaria_vehiculo: joi.number().integer().allow(null).default(null),
                id_sucursal_vehiculo: joi.number().integer().allow(null).default(null)
        }
    }
});