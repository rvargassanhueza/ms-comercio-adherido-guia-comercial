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
module.exports = {map, mapAsoc}