'use strict';
const mysql = require('mysql2/promise');
const configDb = require('../../common/configDb');
const enums = require('../../common/enums');


const pool = mysql.createPool(configDb.db);

async function get(){
    
    let query = 'SELECT DISTINCT tpcac2.id_categoria, tpcac.id_cliente,tpcal.id_localidad ,ca.id_comercio_adherido ,ca.nombre_comercio_adherido, ca.descripcion_comercio_adherido, ca.direccion_comercio_adherido, ca.numero_direccion_comercio_adherido, ca.detalle_comercio_adherido, ca.url_facebook_comercio_adherido , ca.url_twitter_comercio_adherido , ca.url_youtube_comercio_adherido , ca.url_whatsapp_comercio_adherido ,ca.url_instagram_comercio_adherido ,ca.url_web_comercio_adherido FROM T_COMERCIO_ADHERIDO ca INNER JOIN t_paso_comercio_adherido_localidad tpcal ON ca.id_comercio_adherido = tpcal.id_comercio_adherido inner join t_paso_comercio_adherido_cliente tpcac on ca.id_comercio_adherido = tpcac.id_comercio_adherido inner join t_paso_comercio_adherido_categoria tpcac2 on ca.id_comercio_adherido = tpcac2.id_comercio_adherido where vigente = 0';
    const result = await pool.query(query);

    if (result[0].length == 0) {
        return null;
      }
      return result[0];

}

async function getId(id){
    let query = 'SELECT DISTINCT tpcac2.id_categoria, tpcac.id_cliente,tpcal.id_localidad ,ca.id_comercio_adherido ,ca.nombre_comercio_adherido, ca.descripcion_comercio_adherido, ca.direccion_comercio_adherido, ca.numero_direccion_comercio_adherido, ca.detalle_comercio_adherido, ca.url_facebook_comercio_adherido , ca.url_twitter_comercio_adherido , ca.url_youtube_comercio_adherido , ca.url_whatsapp_comercio_adherido ,ca.url_instagram_comercio_adherido ,ca.url_web_comercio_adherido FROM T_COMERCIO_ADHERIDO ca INNER JOIN t_paso_comercio_adherido_localidad tpcal ON ca.id_comercio_adherido = tpcal.id_comercio_adherido inner join t_paso_comercio_adherido_cliente tpcac on ca.id_comercio_adherido = tpcac.id_comercio_adherido inner join t_paso_comercio_adherido_categoria tpcac2 on ca.id_comercio_adherido = tpcac2.id_comercio_adherido where vigente = 0 and ca.id_comercio_adherido ='+id+'';  
    const result = await pool.query(query);

    if (result[0].length === 0) {
        return null;
      }
      
      return result[0];
}

async function getComAdhCategoriaId(){
  let query = 'SELECT * FROM T_PASO_COMERCIO_ADHERIDO_CATEGORIA';  
  const result = await pool.query(query);

  if (result[0].length === 0) {
      return null;
    }
    
    return result[0];
}

async function getComAdhLocalidad(){
  let query = 'SELECT * FROM T_PASO_COMERCIO_ADHERIDO_LOCALIDAD';  
  const result = await pool.query(query);

  if (result[0].length === 0) {
      return null;
    }
    
    return result[0];
}

async function getNomComAdhCategoriaId(id){
  let query = 'SELECT DISTINCT pca.id_categoria, ca.id_comercio_adherido, ca.nombre_comercio_adherido FROM T_COMERCIO_ADHERIDO ca INNER JOIN T_PASO_COMERCIO_ADHERIDO_CATEGORIA pca ON ca.id_comercio_adherido = pca.id_comercio_adherido AND pca.id_categoria = '+id+'';  
  const result = await pool.query(query);

  if (result[0].length === 0) {
      return null;
    }
    
    return result[0];
}

async function insertComAdh(params,new_path){

const connection = await pool.getConnection();
await connection.beginTransaction();
const fecha_creacion = {fecha_creacion: new Date()};

// const { data, dataArrayCategorias } = params;
const { nombre_comercio_adherido, descripcion_comercio_adherido, direccion_comercio_adherido, numero_direccion_comercio_adherido,  url_facebook_comercio_adherido, url_twitter_comercio_adherido, url_youtube_comercio_adherido, url_whatsapp_comercio_adherido, url_instagram_comercio_adherido, url_web_comercio_adherido, id_localidad, id_cliente,categorias} = params; 

let queryComAdh_Categoria;
let id_categoria;

try {

    let queryComAdh = 'INSERT INTO T_COMERCIO_ADHERIDO SET nombre_comercio_adherido = ?, descripcion_comercio_adherido = ?, direccion_comercio_adherido = ?, numero_direccion_comercio_adherido = ?, detalle_comercio_adherido = ?, url_facebook_comercio_adherido = ?, url_twitter_comercio_adherido = ?, url_youtube_comercio_adherido = ?, url_whatsapp_comercio_adherido = ?, url_instagram_comercio_adherido = ?, url_web_comercio_adherido = ?, fecha_creacion = ?, fecha_modificacion = ?, usuario_creacion = ?, usuario_modificacion = ?, vigente = ?';

    let queryComAdh_Cliente = 'INSERT INTO T_PASO_COMERCIO_ADHERIDO_CLIENTE SET id_comercio_adherido = ?, id_cliente = ?';

    let queryComAdh_Localidad = 'INSERT INTO T_PASO_COMERCIO_ADHERIDO_LOCALIDAD SET id_comercio_adherido = ?, id_localidad = ?';

//PENDIENTE INSERTAR EN SUB-CATEGORÍAS

    const resultForm = await connection.query(queryComAdh,[nombre_comercio_adherido, descripcion_comercio_adherido, direccion_comercio_adherido, numero_direccion_comercio_adherido, new_path, url_facebook_comercio_adherido, url_twitter_comercio_adherido, url_youtube_comercio_adherido, url_whatsapp_comercio_adherido, url_instagram_comercio_adherido, url_web_comercio_adherido, fecha_creacion.fecha_creacion, null, null, null, 0]);

    const lastIdComAdh = resultForm[0].insertId;


    queryComAdh_Categoria = 'INSERT INTO T_PASO_COMERCIO_ADHERIDO_CATEGORIA SET id_comercio_adherido = ?, id_categoria = ?';
      // id_categoria = categorias[i];
      await connection.query(queryComAdh_Categoria, [lastIdComAdh, categorias]);

  //   for (let i= 0; i< categorias.length; i++){
  //     queryComAdh_Categoria = 'INSERT INTO T_PASO_COMERCIO_ADHERIDO_CATEGORIA SET id_comercio_adherido = ?, id_categoria = ?';
  //     id_categoria = categorias[i];
  //     await connection.query(queryComAdh_Categoria, [lastIdComAdh, categorias]);
  // }
        
        await connection.query(queryComAdh_Cliente, [lastIdComAdh, id_cliente]);
        await connection.query(queryComAdh_Localidad, [lastIdComAdh, id_localidad]);


    await connection.commit();
    return true;
    

  } catch (err) {

    await connection.rollback();
    throw err;

  } finally {

    connection.release();

  }
}

async function updateComAdh(params){
  const { id_comercio_adherido,nombre_comercio_adherido, descripcion_comercio_adherido, direccion_comercio_adherido, numero_direccion_comercio_adherido, detalle_comercio_adherido,  url_facebook_comercio_adherido, url_twitter_comercio_adherido, url_youtube_comercio_adherido, url_whatsapp_comercio_adherido, url_instagram_comercio_adherido, url_web_comercio_adherido, id_localidad, id_cliente,categorias} = params;
    const fecha_modificacion = {fecha_modificacion: new Date()}

    try {
    let query = 'UPDATE T_COMERCIO_ADHERIDO SET nombre_comercio_adherido = ?, descripcion_comercio_adherido = ?, direccion_comercio_adherido = ?, numero_direccion_comercio_adherido = ?, detalle_comercio_adherido = ?, url_facebook_comercio_adherido = ?, url_twitter_comercio_adherido = ?, url_youtube_comercio_adherido = ?, url_whatsapp_comercio_adherido = ?, url_instagram_comercio_adherido = ?, url_web_comercio_adherido = ?,  fecha_modificacion = ?, usuario_modificacion = ?, vigente = ? WHERE id_comercio_adherido = '+id_comercio_adherido+'';

    const result = await pool.query(query,[nombre_comercio_adherido, descripcion_comercio_adherido, direccion_comercio_adherido, numero_direccion_comercio_adherido, detalle_comercio_adherido, url_facebook_comercio_adherido, url_twitter_comercio_adherido, url_youtube_comercio_adherido, url_whatsapp_comercio_adherido, url_instagram_comercio_adherido, url_web_comercio_adherido, fecha_creacion.fecha_creacion, null, null, null, 0]);

    if (result[0].affectedRows === 0) {
        return null;
      }
      return result[0];

    } catch (err) {
     
      throw err;
  
   } finally {
    }
}

async function deleteComAdh(id){
    const fecha_modificacion = {fecha_modificacion: new Date()}
    const eliminado = enums.Eliminado;
    
    let query = 'UPDATE T_COMERCIO_ADHERIDO SET fecha_modificacion = ?,  usuario_modificacion = ?, vigente = ? WHERE id_comercio_adherido = '+id+'';
    const result = await pool.query(query,[fecha_modificacion.fecha_modificacion, null, eliminado]);

    if (result[0].affectedRows === 0) {
        return null;
      }
      return result[0];
}

module.exports = {
  get: get,
  getId: getId,
  getComAdhCategoriaId:getComAdhCategoriaId,
  getNomComAdhCategoriaId:getNomComAdhCategoriaId,
  getComAdhLocalidad:getComAdhLocalidad,
    insertComAdh: insertComAdh,
    updateComAdh: updateComAdh,
    deleteComAdh: deleteComAdh
}