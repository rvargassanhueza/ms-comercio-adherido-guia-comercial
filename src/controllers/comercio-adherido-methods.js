'use strict'
require('dotenv').config({ path: 'env.env' });
const comAdhServices = require('../database/comercio-adherido-db');
const httpStatus = require('http-status');
const constants = require('../../common/const');
const cacheApiMainData = require('../../helpers/cache/cache')
const mapMainData = require('../../helpers/map/map')

let _get = async function (req, res, next) {
    try {

        const result = await comAdhServices.get();
                if (result == null) {
                        res.json(httpStatus.NOT_FOUND);
                        res.end();
                        return;
                    }else{
                        res.json(httpStatus.OK, result);
                    }
    } catch (err) {
        res.send(httpStatus.INTERNAL_SERVER_ERROR, JSON.stringify({Error: httpStatus.INTERNAL_SERVER_ERROR, Message: constants.Error.INTERNALERROR}) );
    }
};

let _getId = async function (req, res, next) {
    try {
        const { params } = req;
        const { id } = params;
        const result = await comAdhServices.getId(id);

                if (result == null) {
                        res.json(httpStatus.NOT_FOUND);
                        res.end();
                        return;
                    }else{
                        res.json(httpStatus.OK, result);
                        res.end();
                    }
    } catch (err) {
        res.send(httpStatus.INTERNAL_SERVER_ERROR, JSON.stringify({Error: httpStatus.INTERNAL_SERVER_ERROR, Message: constants.Error.INTERNALERROR}) );
    }
};

let getComAdhCategoriaId = async function (req, res, next) {
    try {
        const { params } = req;
        const { idCategoria } = params;
        const cache = await cacheApiMainData.getCacheMainData('key-data');
        const result = await comAdhServices.get();
        const result_ = await comAdhServices.getNomComAdhCategoriaId(idCategoria);

            if (cache){
                if (result == null) {
                        res.json(httpStatus.NOT_FOUND);
                        res.end();
                        return;
                    }else{
                        const maping = await mapMainData.map(result,cache,result_);
                        res.json(httpStatus.OK, maping);
                        res.end();
                    }    
            }

            if (result === null) {
                res.json(httpStatus.NOT_FOUND);
                res.end();
                return;
            }
        res.json(httpStatus.OK, result);
    } catch (err) {
        res.send(httpStatus.INTERNAL_SERVER_ERROR, JSON.stringify({Error: httpStatus.INTERNAL_SERVER_ERROR, Message: constants.Error.INTERNALERROR}) );
    }
};

let getComAdhSubCategoriaId = async function (req, res, next) {
    try {
        const { params } = req;
        const { idSubCategoria } = params;
        const cache = await cacheApiMainData.getCacheMainData('key-data');
        const resultComercioAdherido = await comAdhServices.get();
        // const result_ = await comAdhServices.getNomComAdhCategoriaId(idSubCategoria);
        let resultComAdhCategoria = await comAdhServices.getComAdhCategoriaId();
        

            if (cache){
                if (resultComercioAdherido == null) {
                        res.json(httpStatus.NOT_FOUND);
                        res.end();
                        return;
                    }else{
                        const maping = await mapMainData.mapAsoc(resultComercioAdherido,cache, idSubCategoria, resultComAdhCategoria);
                        res.json(httpStatus.OK, maping);
                        res.end();
                    }    
            }

            if (resultComercioAdherido === null) {
                res.json(httpStatus.NOT_FOUND);
                res.end();
                return;
            }
        res.json(httpStatus.OK, resultComercioAdherido);
    } catch (err) {
        res.send(httpStatus.INTERNAL_SERVER_ERROR, JSON.stringify({Error: httpStatus.INTERNAL_SERVER_ERROR, Message: constants.Error.INTERNALERROR}) );
    }
};

let _insert = async function (req, res, next){
    try{
        const { params } = req;

        let result = await comAdhServices.insertComAdh(params);

        if(result === null){
            res.json(httpStatus.NOT_FOUND);
            res.end();
            return;
        }
        res.json(httpStatus.CREATED, result[0]);
        res.end();
        
    }catch(err){
        res.send(httpStatus.INTERNAL_SERVER_ERROR, JSON.stringify({Error: httpStatus.INTERNAL_SERVER_ERROR, Message: constants.Error.INTERNALERROR}) );

    }
};

let _update = async function (req, res, next){
    try{
        const { params } = req;
        let result = await comAdhServices.updateComAdh(params);
        
        if(result === null){
            res.json(httpStatus.NOT_FOUND);
            res.end();
            return;
        }
        res.json(httpStatus.NO_CONTENT);
        res.end();
        
    }catch(err){
        res.send(httpStatus.INTERNAL_SERVER_ERROR, JSON.stringify({Error: httpStatus.INTERNAL_SERVER_ERROR, Message: constants.Error.INTERNALERROR}) );

    }
};

let _delete = async function (req, res, next){
    try{
        const { params:{id} } = req;
        let result = await comAdhServices.deleteComAdh(id);
        
        if(result === null){
            res.json(httpStatus.NOT_FOUND);
            res.end();
            return;
        }
        res.json(httpStatus.OK);
        res.end();
        
    }catch(err){
        res.send(httpStatus.INTERNAL_SERVER_ERROR, JSON.stringify({Error: httpStatus.INTERNAL_SERVER_ERROR, Message: constants.Error.INTERNALERROR}) );

    }
};

module.exports = {
    get: _get,
    getId: _getId,
    getComAdhCategoriaId:getComAdhCategoriaId,
    getComAdhSubCategoriaId:getComAdhSubCategoriaId,
    insertComAdh: _insert,
    updateComAdh: _update,
    deleteComAdh: _delete
}