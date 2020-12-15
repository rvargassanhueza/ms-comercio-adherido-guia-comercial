/* ======================== */
/* === INSERTANDO DATOS === */
/* ======================== */

-- -- CREAR TIPO DE FORMULARIO
-- SET @nombre_tipo_formulario = 'Formulario Automotriz';
-- SET @descripcion_tipo_formulario  = 'Formulario Automotriz';

-- INSERTAR FORMULARIO (llenado de datos por visitantes del sitio)
SET @id_tipo_formulario  = 1;
SET @nombre_formulario  = 'Valenzuela delarze peugeot 301 hdi allure';
SET @descripcion_formulario  = 'Valenzuela delarze peugeot 301 hdi allure';
SET @nombre_sitio_web  = 'alairelibre.cl';
SET @nuevo_valor_vehiculo  = 7500000;
SET @antiguo_valor_vehiculo  = 6500000;
SET @valor_bono_vehiculo  = 1000000;
SET @valor_pie_vehiculo  = 1000000;
SET @valor_cuota  = 350000;
SET @valor_matricula  = null;
SET @id_marca_vehiculo  = 1;
SET @id_modelo_vehiculo  = 1;
SET @id_concesionaria_vehiculo  = 1;
SET @id_sucursal_vehiculo  = 2;
SET @dataJson  = null;

-- -- CREAR TIPO DE USUSARIO

-- SET @nombre_tipo_usuario = 'Usuario web';
-- SET @descripcion_tipo_usuario= 'Usuario web, es el usuario que llena los formularios desde los sitios cooperativa, m360 o aal';

-- -- CREAR  USUSARIO

-- SET @id_tipo_usuario = 1;
-- SET @nombre_usuario = 'evalenzuela';
-- SET @pass_usuario = '123456';
-- SET @descripcion_usuario = 'Descripción Usuario Test';

-- INSERTAR PERSONA

SET @id_usuario  = 1;
SET @rut_persona  = '169881456';
SET @nombre_completo_persona='rorigovargas';
SET @correo_persona ='rvargas@cooperativa.cl';
SET @telefono_persona = '+56965173503';

-- INSERTAR DIRECCIÓN (347 en el caso de que no vaya comuna, 347 = sin comuna)

SET @id_comuna = 347;
SET @calle_direccion = null;
SET @numero_direccion = null;
SET @observacion_direccion = null;
SET @cod_postal = null;

-- **************************************************************************

-- INSERT INTO `t_tipo_usuario` (`nombre_tipo_usuario`, `descripcion_tipo_usuario`, `fecha_creacion`, `fecha_modificacion`, `usuario_creacion`, `usuario_modificacion`, `vigente`)
-- SELECT @nombre_tipo_usuario, @descripcion_tipo_usuario, CURRENT_TIMESTAMP(), NULL, NULL, NULL, 0;

-- INSERT INTO `t_usuarios` (`id_tipo_usuario`, `nombre_usuario`, `pass_usuario`, `descripcion_usuario`, `fecha_creacion`, `fecha_modificacion`, `usuario_creacion`, `usuario_modificacion`, `vigente`) 
-- SELECT @id_tipo_usuario, @nombre_usuario, @pass_usuario, @descripcion_usuario, CURRENT_TIMESTAMP(), NULL, NULL, NULL, 0;

-- INSERT INTO `t_tipo_formularios` (`nombre_tipo_formulario`, `descripcion_tipo_formulario`, `fecha_creacion`, `fecha_modificacion`, `usuario_creacion`, `usuario_modificacion`, `vigente`) 
-- SELECT @nombre_tipo_formulario, @descripcion_tipo_formulario, CURRENT_TIMESTAMP(), NULL, NULL, NULL, 0;

INSERT INTO T_FORMULARIOS (id_tipo_formulario, id_usuario, nombre_formulario, descripcion_formulario, nombre_sitio_web, nuevo_valor_vehiculo, antiguo_valor_vehiculo, valor_bono_vehiculo, valor_pie_vehiculo, valor_cuota, valor_matricula, id_marca_vehiculo, id_modelo_vehiculo, id_concesionaria_vehiculo, id_sucursal_vehiculo, dataJson, fecha_creacion, fecha_modificacion, usuario_creacion, usuario_modificacion, vigente) 
SELECT @id_tipo_formulario, @id_usuario, @nombre_formulario, @descripcion_formulario, @nombre_sitio_web, @nuevo_valor_vehiculo, @antiguo_valor_vehiculo, @valor_bono_vehiculo, @valor_pie_vehiculo, @valor_cuota, @valor_matricula, @id_marca_vehiculo, @id_modelo_vehiculo, @id_concesionaria_vehiculo, @id_sucursal_vehiculo, @dataJson, CURRENT_TIMESTAMP(), NULL, NULL, NULL, 0;
SET @id_formulario_scope = (SELECT LAST_INSERT_ID());

INSERT INTO T_PERSONAS (id_usuario, rut_persona, nombre_completo_persona, correo_persona, telefono_persona, fecha_creacion, fecha_modificacion, usuario_creacion, usuario_modificacion, vigente)
SELECT @id_usuario, @rut_persona, @nombre_completo_persona, @correo_persona, @telefono_persona, CURRENT_TIMESTAMP(), null, null, null, 0;
SET @id_personas_scope = (SELECT LAST_INSERT_ID());

INSERT INTO T_DIRECCION (id_persona, id_comuna, calle_direccion, numero_direccion, observacion_direccion, cod_postal, fecha_creacion, fecha_modificacion, usuario_creacion, usuario_modificacion, vigente)
SELECT  @id_personas_scope, @id_comuna, @calle_direccion, @numero_direccion, @observacion_direccion, @cod_postal, CURRENT_TIMESTAMP(), null, null, null, 0;

INSERT INTO T_FORMULARIO_T_PERSONAS (id_persona, id_formulario)
SELECT @id_personas_scope, @id_formulario_scope;