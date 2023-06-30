"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client = require('./client');
var createUser = require('./users').createUser;
var _a = require('./transactions'), deposit = _a.deposit, withdraw = _a.withdraw, getTransactionsByUserId = _a.getTransactionsByUserId;
var getCurrentBalance = require('./balances').getCurrentBalance;
var dropTables = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('DROPPING TABLES');
                return [4 /*yield*/, client.query("\n  DROP TABLE IF EXISTS balances;\n  DROP TABLE IF EXISTS transactions;\n  DROP TABLE IF EXISTS users;\n  ")];
            case 1:
                _a.sent();
                console.log('FINISHED DROPPING TABLES');
                return [2 /*return*/];
        }
    });
}); };
var buildTables = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('CREATING TABLES');
                return [4 /*yield*/, client.query("\n    CREATE TABLE users(id SERIAL PRIMARY KEY,\n                       first_name VARCHAR(15) NOT NULL,\n                       last_name VARCHAR(15) NOT NULL,\n                       email_address VARCHAR(15) NOT NULL,\n                       password VARCHAR(100) NOT NULL,\n                       pin INTEGER NOT NULL,\n                       account_number INTEGER);\n    CREATE TABLE transactions(id SERIAL PRIMARY KEY,\n                              user_id INTEGER REFERENCES users(id) NOT NULL,\n                              type VARCHAR(10) NOT NULL,\n                              amount INTEGER NOT NULL);\n    CREATE TABLE balances(id SERIAL PRIMARY KEY,\n                          user_id INTEGER REFERENCES users(id) NOT NULL UNIQUE,\n                          amount INTEGER NOT NULL);\n  ")];
            case 1:
                _a.sent();
                console.log('FINISHED CREATING TABLES');
                return [2 /*return*/];
        }
    });
}); };
var createUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("CREATIING USERS");
                return [4 /*yield*/, createUser('firstName', 'lastName', 'emailAddress', 'password', 1234)];
            case 1:
                _a.sent();
                console.log("FINISHED CREATING USERS");
                return [2 /*return*/];
        }
    });
}); };
var seedDb = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('CONNECTING TO DB');
                client.connect();
                console.log('FINISHED CONNECTING TO DB');
                return [4 /*yield*/, dropTables()];
            case 1:
                _a.sent();
                return [4 /*yield*/, buildTables()];
            case 2:
                _a.sent();
                return [4 /*yield*/, createUsers()];
            case 3:
                _a.sent();
                return [4 /*yield*/, deposit(1, 500)];
            case 4:
                _a.sent();
                return [4 /*yield*/, withdraw(1, 250)];
            case 5:
                _a.sent();
                return [4 /*yield*/, getTransactionsByUserId(1)];
            case 6:
                _a.sent();
                return [4 /*yield*/, getCurrentBalance(1)];
            case 7:
                _a.sent();
                client.end();
                console.log("DISCONNECTED FROM DB");
                return [2 /*return*/];
        }
    });
}); };
seedDb();
