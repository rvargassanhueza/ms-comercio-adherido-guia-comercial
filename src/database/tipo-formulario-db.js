'use strict';
const mysql = require('mysql2/promise');
const configDb = require('../../common/configDb');
const enums = require('../../common/enums');


const pool = mysql.createPool(configDb.db);

async function get(){
    
    let query = 'SELECT * FROM T_TIPO_FORMULARIOS WHERE vigente = 0'
    const result = await pool.query(query);

    if (!result[0]) {
        throw new Error('GET with this id was not found');
      }
      return result[0];

}

async function getId(id){
    let query = 'SELECT * FROM T_TIPO_FORMULARIOS WHERE id_tipo_formulario = '+id+' AND vigente = 0';  
    const result = await pool.query(query);

    if (result[0].length === 0) {
        return null;
      }
      return result[0];
}

async function insertTipoForm(params){
    const { nombre_tipo_formulario, descripcion_tipo_formulario } = params;
    const fecha_creacion = {fecha_creacion: new Date()}

    let query = 'INSERT INTO T_TIPO_FORMULARIOS SET nombre_tipo_formulario = ?, descripcion_tipo_formulario = ?,fecha_creacion = ?, fecha_modificacion = ?, usuario_creacion = ?, usuario_modificacion = ?, vigente = ?';

    const result = await pool.query(query,[nombre_tipo_formulario, descripcion_tipo_formulario, fecha_creacion.fecha_creacion, null, null, null, 0]);

    if (!result[0]) {
        throw new Error('Error al insertar datos');
      }
      return result[0];
}

async function updateTipoForm(params){
    const {id, nombre_tipo_formulario, descripcion_tipo_formulario } = params;
    const fecha_modificacion = {fecha_modificacion: new Date()}

    let query = 'UPDATE T_TIPO_FORMULARIOS SET nombre_tipo_formulario = ?, descripcion_tipo_formulario = ?, fecha_modificacion = ?,  usuario_modificacion = ?, vigente = ? WHERE id_tipo_formulario = '+id+'';

    const result = await pool.query(query,[nombre_tipo_formulario, descripcion_tipo_formulario, fecha_modificacion.fecha_modificacion, null, 0]);

    if (result[0].affectedRows === 0) {
        return null;
      }
      return result[0];
}

async function deleteTipoForm(id){
    const fecha_modificacion = {fecha_modificacion: new Date()}
    const eliminado = enums.Eliminado;
    
    let query = 'UPDATE T_TIPO_FORMULARIOS SET fecha_modificacion = ?,  usuario_modificacion = ?, vigente = ? WHERE id_tipo_formulario = '+id+'';
    const result = await pool.query(query,[fecha_modificacion.fecha_modificacion, null, eliminado]);

    if (result[0].affectedRows === 0) {
        return null;
      }
      return result[0];
}

module.exports = {
    getTipoForm: get,
    getTipoFormId: getId,
    insertTipoForm: insertTipoForm,
    updateTipoForm: updateTipoForm,
    deleteTipoForm: deleteTipoForm
}