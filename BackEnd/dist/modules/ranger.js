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
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = __importDefault(require("../database"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var Ranger = /** @class */ (function () {
    function Ranger() {
    }
    Ranger.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT * from rangers";
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Rangers Couldnt be retrieved, ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Ranger.prototype.getRangerById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT * from rangers where id =$1";
                        return [4 /*yield*/, conn.query(sql, [Number(id)])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Rangers Couldnt be retrieved, ".concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Ranger.prototype.getRangerClosedService = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, sql2, info, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT closedby_id from services where id= $1";
                        return [4 /*yield*/, conn.query(sql, [BigInt(id)])];
                    case 2:
                        result = _a.sent();
                        sql2 = "SELECT * from rangers where id=$1";
                        return [4 /*yield*/, conn.query(sql2, [Number(result.rows[0].closedby_id)])];
                    case 3:
                        info = _a.sent();
                        conn.release();
                        return [2 /*return*/, info.rows[0]];
                    case 4:
                        err_3 = _a.sent();
                        throw new Error("Rangers Couldnt be retrieved, ".concat(err_3));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Ranger.prototype.getRangerClosedComplaint = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, sql2, info, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT closedby_id from complaints where id= $1";
                        return [4 /*yield*/, conn.query(sql, [BigInt(id)])];
                    case 2:
                        result = _a.sent();
                        sql2 = "SELECT * from rangers where id=$1";
                        return [4 /*yield*/, conn.query(sql2, [Number(result.rows[0].closedby_id)])];
                    case 3:
                        info = _a.sent();
                        conn.release();
                        return [2 /*return*/, info.rows[0]];
                    case 4:
                        err_4 = _a.sent();
                        throw new Error("Rangers Couldnt be retrieved, ".concat(err_4));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Ranger.prototype.checkRanger = function (nationality_id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT * from rangers where nationality_id = $1";
                        return [4 /*yield*/, conn.query(sql, [nationality_id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rowCount > 0 ? result.rows[0] : null];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("Rangers Couldnt be retrieved, ".concat(err_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Ranger.prototype.register = function (u) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, password_digest, result, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "INSERT INTO rangers(name,role,password_digest,email,phone_number,nationality_id,firstTime) Values($1,$2,$3,$4,$5,$6,$7) RETURNING *";
                        password_digest = Math.random().toString(36).substr(2, 6) + Math.random().toString(36).substr(2, 6) + Math.random().toString(36).substr(2, 6);
                        return [4 /*yield*/, conn.query(sql, [u.name, u.role, password_digest, u.email, u.phone_number, u.nationality_id, true])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_6 = _a.sent();
                        throw new Error("Ranger Couldnt be registerd, ".concat(err_6));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Ranger.prototype.createRangerPassword = function (u) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, SALT_ROUNDS, BCRYPT_PASSWORD, conn, sql, password_digest, result, err_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = process.env, SALT_ROUNDS = _a.SALT_ROUNDS, BCRYPT_PASSWORD = _a.BCRYPT_PASSWORD;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        conn = _b.sent();
                        sql = "UPDATE rangers set password_digest = $1 , firstTime = $2 where nationality_id = $3 RETURNING *";
                        password_digest = bcrypt_1.default.hashSync(u.password_digest + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS));
                        return [4 /*yield*/, conn.query(sql, [password_digest, false, u.nationality_id])];
                    case 3:
                        result = _b.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 4:
                        err_7 = _b.sent();
                        throw new Error("Ranger Couldnt be registerd, ".concat(err_7));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Ranger.prototype.authenticate = function (nationality_id, password) {
        return __awaiter(this, void 0, void 0, function () {
            var BCRYPT_PASSWORD, conn, sql, userInfo, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        BCRYPT_PASSWORD = process.env.BCRYPT_PASSWORD;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        conn = _a.sent();
                        sql = "SELECT * from rangers where nationality_id=$1";
                        return [4 /*yield*/, conn.query(sql, [nationality_id])];
                    case 3:
                        userInfo = _a.sent();
                        conn.release();
                        if (userInfo.rows[0].firsttime === false) {
                            if (bcrypt_1.default.compareSync(password + BCRYPT_PASSWORD, userInfo.rows[0].password_digest)) {
                                return [2 /*return*/, userInfo.rows[0]];
                            }
                            else {
                                return [2 /*return*/, null];
                            }
                        }
                        else {
                            if (password === userInfo.rows[0].password_digest) {
                                return [2 /*return*/, userInfo.rows[0]];
                            }
                            else {
                                return [2 /*return*/, null];
                            }
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        err_8 = _a.sent();
                        throw new Error("Ranger Couldnt be registerd, ".concat(err_8));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return Ranger;
}());
exports.default = Ranger;