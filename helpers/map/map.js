async function map(data_, cacheData)
{
    //data_ --> formulario desde bd
    //cacheData --> caché de modelos y marcas
    const {marca, modelo, concesionaria, sucursal } = cacheData;
    const {data:dataMarca} = marca;
    const {data:dataModelo} = modelo;
    const {data:dataConcesionaria} = concesionaria;
    const {data:dataSucursal} = sucursal;

        try
        {
            let dataObject = {};
            let finalDataObject = [];
             data_.map(function(e){
                    dataObject = {
                        id_formulario: e.id_formulario,
                        nombre_formulario: e.nombre_formulario,
                        descripcion_formulario: e.descripcion_formulario,
                        nombre_sitio_web: e.nombre_sitio_web,
                        nuevo_valor_vehiculo: e.nuevo_valor_vehiculo,
                        antiguo_valor_vehiculo: e.antiguo_valor_vehiculo,
                        valor_bono_vehiculo: e.valor_bono_vehiculo,
                        valor_pie_vehiculo: e.valor_pie_vehiculo,
                        valor_cuota: e.valor_cuota,
                    }
                 dataMarca.map(function (f){
                        if(e.id_marca_vehiculo === f.id_marca){
                            const objectMarca = {
                                marca:{
                                    id_marca: f.id_marca,
                                    nombre_marca: f.nombre_marca,
                                    descripcion_marca: f.descripcion_marca
                                }
                            }
                            Object.assign(dataObject,objectMarca)
                        }
                });  
                dataModelo.map(function (f){
                    if(e.id_modelo_vehiculo === f.id_modelo){
                        const objectModelo = {
                            modelo:{
                                id_modelo: f.id_modelo,
                                nombre_modelo: f.nombre_modelo,
                                descripcion_modelo: f.descripcion_modelo
                            }
                        }
                        Object.assign(dataObject,objectModelo)
                    }
                });

                dataConcesionaria.map(function (f){
                    if(e.id_concesionaria_vehiculo === f.id_concesionaria){
                        const objectConcesionaria = {
                            concesionaria:{
                                id_concesionaria: f.id_concesionaria,
                                nombre_concesionaria: f.nombre_concesionaria,
                                descripcion_concesionaria: f.descripcion_concesionaria
                            }
                        }
                        Object.assign(dataObject,objectConcesionaria)
                    }
                });

                dataSucursal.map(function (f){
                    if(e.id_sucursal_vehiculo === f.id_sucursal){
                        const objectSucursal = {
                            sucursal:{
                                id_sucursal: f.id_sucursal,
                                nombre_sucursal: f.nombre_sucursal,
                                descripcion_sucursal: f.descripcion_sucursal,
                                direccion_sucursal: f.direccion_sucursal,
                                id_comuna: f.id_comuna
                            }
                        }
                        Object.assign(dataObject,objectSucursal)
                    }
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