const fetch = require('node-fetch');

const URL_BASE = "https://app-comun.herokuapp.com/v1/";

async function getCategoria()
{
    try
    {
        let response_1 = await fetch(`${URL_BASE}mainData/categoria/`);
        return response_1.json();
    }
    catch(Error)
    {
        console.error(Error);
    }
}

async function getSubCategoria()
{
    try
    {
        let response_1 = await fetch(`${URL_BASE}mainData/subCategoria/`);
        return response_1.json();
    }
    catch(Error)
    {
        console.error(Error);
    }
}

async function getAsocCatSubCategoria()
{
    try
    {
        let response_1 = await fetch(`${URL_BASE}mainData/categoria-sub_categoria/`);
        return response_1.json();
    }
    catch(Error)
    {
        console.error(Error);
    }
}

async function getCliente()
{
    try
    {
        let response_1 = await fetch(`${URL_BASE}mainData/cliente/`);
        return response_1.json();
    }
    catch(Error)
    {
        console.error(Error);
    }
}

async function getLocalidad()
{
    try
    {
        let response_1 = await fetch(`${URL_BASE}mainData/localidad/`);
        return response_1.json();
    }
    catch(Error)
    {
        console.error(Error);
    }
}

async function dataObject(){
    const categoria = await getCategoria();
    const cliente = await getCliente();
    const localidad = await getLocalidad();
    const subCategoria = await getSubCategoria();
    const asocSubCat_Cat = await getAsocCatSubCategoria();

    return {
        categoria,
        cliente,
        localidad,
        subCategoria,
        asocSubCat_Cat
    };
}

module.exports = {dataObject}