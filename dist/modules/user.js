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
var twilio_1 = __importDefault(require("twilio"));
var _a = process.env, token = _a.token, sid = _a.sid, service_id = _a.service_id;
var clientServer = (0, twilio_1.default)(sid, token);
var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT * from users";
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Users Couldnt be retrieved, ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.register = function (u) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, SALT_ROUNDS, BCRYPT_PASSWORD, conn, sql, password_digest, result, err_2;
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
                        sql = "INSERT INTO users(name,b_date,email,gender,password_digest,phone_number,nationality_id,user_type) Values($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *";
                        password_digest = bcrypt_1.default.hashSync(u.password_digest + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS));
                        return [4 /*yield*/, conn.query(sql, [u.name, u.b_date, u.email, u.gender, password_digest, u.phone_number, u.nationality_id, u.user_type])];
                    case 3:
                        result = _b.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 4:
                        err_2 = _b.sent();
                        throw new Error("Users Couldnt be registerd, ".concat(err_2));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.authenticate = function (phoneNumber, password) {
        return __awaiter(this, void 0, void 0, function () {
            var BCRYPT_PASSWORD, conn, sql, userInfo, err_3;
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
                        sql = "SELECT * from users where phone_number=$1";
                        return [4 /*yield*/, conn.query(sql, [phoneNumber])];
                    case 3:
                        userInfo = _a.sent();
                        conn.release();
                        if (userInfo.rows[0]) {
                            if (bcrypt_1.default.compareSync(password + BCRYPT_PASSWORD, userInfo.rows[0].password_digest)) {
                                return [2 /*return*/, userInfo.rows[0]];
                            }
                            else {
                                return [2 /*return*/, null];
                            }
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        err_3 = _a.sent();
                        throw new Error("Users Couldnt be registerd, ".concat(err_3));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.vertifiyPhoneNumber = function (phone_number, code, user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var vertify_1, status_1, conn_1, sql_1, err_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        vertify_1 = false;
                        status_1 = "vertify";
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn_1 = _a.sent();
                        sql_1 = 'UPDATE users set status=$1 where id=$2';
                        return [4 /*yield*/, clientServer.verify.services(service_id)
                                .verificationChecks
                                .create({ to: "+962".concat(phone_number), code: code })
                                .then(function (verification_check) { return __awaiter(_this, void 0, void 0, function () {
                                var result;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(verification_check.status === "approved")) return [3 /*break*/, 2];
                                            return [4 /*yield*/, conn_1.query(sql_1, [status_1, user_id])];
                                        case 1:
                                            result = _a.sent();
                                            conn_1.release();
                                            vertify_1 = true;
                                            _a.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        console.log(vertify_1);
                        if (vertify_1) {
                            return [2 /*return*/, true];
                        }
                        else {
                            return [2 /*return*/, false];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("Couldnt Vertified ".concat(err_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return User;
}());
exports.default = User;
