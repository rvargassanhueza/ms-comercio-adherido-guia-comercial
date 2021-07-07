const { func } = require("joi");

async function map(data_, cacheData, result_){

    const {categoria } = cacheData;
    const {data:dataCategoria} = categoria;

        try
        {
            let dataObject = {};
            let finalDataObject = [];
            let objectComercioAdherido = {};
             data_.map(function(e){
                    dataObject = {}
                    dataCategoria.map(function (f){
                        result_.map(function(t){
                            if(e.id_comercio_adherido === t.id_comercio_adherido && t.id_categoria === f.id_categoria){
                                objectComercioAdherido = {
                                    comercioAdherido:{
                                        id_comercio_adherido :t.id_comercio_adherido,
                                        nombre_comercio_adherido: t.nombre_comercio_adherido,
                                        id_categoria: f.id_categoria,
                                        nombre_categoria: f.nombre_categoria
                                    }
                                }
                                Object.assign(dataObject,objectComercioAdherido);
                            }
                        });
                    }); 
                    finalDataObject.push(dataObject);
            });

        return finalDataObject;
    }
    catch(Error)
    {
        console.error(Error);
    }
}

async function mapLocalidad(data_, cacheData){

    const {localidad,categoria,cliente} = cacheData;
    const {data:dataLocalidad} = localidad;
    const {data:dataCategoria} = categoria;
    const {data:dataCliente} = cliente;


        try
        {
            let dataObject = {};
            let finalDataObject = [];
            let objectComercioAdherido = {};
             data_.map(function(e){
                dataObject = {}
                    dataLocalidad.map(function (t){
                        dataCliente.map(function (f){
                            dataCategoria.map(function (d){

                        if(e.id_localidad === t.id_localidad){
                            if(e.id_categoria === d.id_categoria){
                                if(e.id_cliente === f.id_cliente)
                                    dataObject={
                                        'id_comercio_adherido':e.id_comercio_adherido,
                                            'nombre_comercio_adherido':e.nombre_comercio_adherido,
                                            'descripcion_comercio_adherido':e.descripcion_comercio_adherido,
                                            'direccion_comercio_adherido':e.direccion_comercio_adherido,
                                            'numero_direccion_comercio_adherido':e.numero_direccion_comercio_adherido,
                                            'nombre_localidad':t.nombre_localidad,
                                            'nombre_cliente':f.nombre_cliente,
                                            'nombre_categoria':d.nombre_categoria,
                                            'url_facebook_comercio_adherido':e.url_facebook_comercio_adherido,
                                            'url_twitter_comercio_adherido':e.url_twitter_comercio_adherido,
                                            'url_youtube_comercio_adherido':e.url_youtube_comercio_adherido,
                                            'url_whatsapp_comercio_adherido':e.url_whatsapp_comercio_adherido,
                                            'url_instagram_comercio_adherido':e.url_instagram_comercio_adherido,
                                            'url_web_comercio_adherido':e.url_web_comercio_adherido,
                                        
                                    }
                                }
                            }
                        })
                    })
                })      

                finalDataObject.push(dataObject);
            });

        return finalDataObject;
    }
    catch(Error)
    {
        console.error(Error);
    }
}

async function mapAsoc(resultComercioAdherido, cacheData, idSubCategoria, resultComAdhCategoria){

    const {subCategoria, asocSubCat_Cat}    = cacheData;
    const {data:dataSubCategoria}           = subCategoria;
    const {data:dataAsocSubCat_Cat}         = asocSubCat_Cat;

    try
        {
            let arrayComercioAdherido = [];
            let objetoComercioAdherido = {};
                resultComercioAdherido.map(function(a){
                    resultComAdhCategoria.map(function(b){
                        dataAsocSubCat_Cat.map(function (c){
                            dataSubCategoria.map(function (d){
                                            if(d.id_sub_categoria == idSubCategoria){
                                                if(idSubCategoria == c.id_sub_categoria){
                                                    if(c.id_categoria === b.id_categoria ){
                                                        if(b.id_comercio_adherido === a.id_comercio_adherido){
                                                            objetoComercioAdherido = {
                                                                'comercioAdherido':{
                                                                        id_comercio_adherido: a.id_comercio_adherido,
                                                                        nombre_comercio_adherido: a.nombre_comercio_adherido
                                                                }
                                                            }
                                                            arrayComercioAdherido.push(objetoComercioAdherido);
                                                        }
                                                    }
                                                }
                                            }
                                        });
                                    });
                                });
                            });
            return arrayComercioAdherido;
        }
        catch(Error)
        {
            console.error(Error);
        }
}

async function mapLocalidadComAdh(resultComercioAdherido, cacheData, idLocalidad, resultComAdhLocalidad){

    const {localidad}    = cacheData;
    const {data:dataLocalidad}           = localidad;
    try
        {
            let arrayComercioAdherido = [];
            let objetoComercioAdherido = {};
                resultComercioAdherido.map(function(a){
                    resultComAdhLocalidad.map(function(b){
                        dataLocalidad.map(function (c){
                                                if(idLocalidad == c.id_localidad){
                                                    if(c.id_localidad === b.id_localidad ){
                                                        if(b.id_comercio_adherido === a.id_comercio_adherido){
                                                            objetoComercioAdherido = {
                                                                'comercioAdherido':{
                                                                        id_comercio_adherido: a.id_comercio_adherido,
                                                                        nombre_comercio_adherido: a.nombre_comercio_adherido
                                                                }
                                                            }
                                                            arrayComercioAdherido.push(objetoComercioAdherido);
                                                        }
                                                    }
                                            }
                                    });
                                });
                            });
            return arrayComercioAdherido;
        }
        catch(Error)
        {
            console.error(Error);
        }
}
module.exports = {map, mapLocalidad, mapAsoc, mapLocalidadComAdh}