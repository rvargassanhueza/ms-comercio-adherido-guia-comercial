const supertest = require('supertest');

const uri = process.env.API_URI;
const port = process.env.API_PORT || '';

const apiUrl = `${uri}:${port}`

console.log(`API TASAS: ${apiUrl}`);
const apiClient = supertest.agent(apiUrl);
exports.apiClient = apiClient;
exports.apiUrl=apiUrl;
