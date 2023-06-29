"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Client = require('pg').Client;
var client = new Client(process.env.DATABASE_URL || 'postgres://localhost:5432/banking_app');
module.exports = client;
