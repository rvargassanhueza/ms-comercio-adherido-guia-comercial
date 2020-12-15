const NodeCache = require( "node-cache" );
const myCache = new NodeCache();
const getApiMainData = require('../../helpers/interapi/ms-comun')

async function getCacheMainData(key)
{
    try
    {
        let response = await myCache.get(key);
            if(response == undefined){
                const mainData = await getApiMainData.dataObject();
                myCache.set(key,mainData,3600);
                return mainData;
            }else{
                console.log( response );
                return response;
            }
    }
    catch(Error)
    {
        console.error(Error);
    }
}

module.exports = {getCacheMainData}