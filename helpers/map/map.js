async function map(data_, cacheData, result_){

    const {categoria, cliente, localidad, subcategoria } = cacheData;
    const {data:dataCategoria} = categoria;
    const {data:dataLocalidad} = localidad;

        try
        {
            let dataObject = {};
            let finalDataObject = [];
            let objectComercioAdherido = {};
             data_.map(function(e){
                    dataObject = {
                            // id_comercio_adherido:e.id_comercio_adherido,
                            // id_categoria: e.id_categoria
                            
                    }
                    
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
module.exports = {map}