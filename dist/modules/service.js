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
var dashboard_1 = require("../handlers/services/dashboard");
var Service = /** @class */ (function () {
    function Service() {
    }
    Service.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT * FROM Services";
                        return [4 /*yield*/, database_1.default.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Couldnt get services: ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Service.prototype.createProposalRequest = function (s) {
        return __awaiter(this, void 0, void 0, function () {
            var serviceType, conn, sql, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        serviceType = 'proposal_request';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "INSERT INTO services (entity_name,notes,user_id,service_type) values($1,$2,$3,$4) RETURNING *";
                        return [4 /*yield*/, database_1.default.query(sql, [s.entity_name, s.notes, dashboard_1.authedUser.id, serviceType])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Couldnt get services: ".concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Service.prototype.createCarsCheckRequest = function (s) {
        return __awaiter(this, void 0, void 0, function () {
            var serviceType, conn, sql, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        serviceType = 'cars_check_request';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "INSERT INTO services (entity_name,is_company,number_of_cars,notes,user_id,service_type) values($1,$2,$3,$4,$5,$6) RETURNING *";
                        return [4 /*yield*/, database_1.default.query(sql, [s.entity_name, s.is_company, s.number_of_cars, s.notes, dashboard_1.authedUser.id, serviceType])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("Couldnt get services: ".concat(err_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Service.prototype.createNosieMeasurementRequest = function (s) {
        return __awaiter(this, void 0, void 0, function () {
            var serviceType, conn, sql, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        serviceType = 'nosie_measurement_request';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "INSERT INTO services (entity_name,notes,user_id,service_type) values($1,$2,$3,$4) RETURNING *";
                        return [4 /*yield*/, database_1.default.query(sql, [s.entity_name, s.notes, dashboard_1.authedUser.id, serviceType])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("Couldnt get services: ".concat(err_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Service.prototype.createCourseRequest = function (s) {
        return __awaiter(this, void 0, void 0, function () {
            var serviceType, conn, sql, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        serviceType = 'course_request';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "INSERT INTO services (age_group,entity_name,expected_audience,notes,service_date,user_id,service_type) values($1,$2,$3,$4,$5,$6,$7) RETURNING *";
                        return [4 /*yield*/, database_1.default.query(sql, [s.age_group, s.entity_name, s.expected_audience, s.notes, s.service_date, dashboard_1.authedUser.id, serviceType])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("Couldnt get services: ".concat(err_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Service.prototype.deleteService = function (sid) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "DELETE FROM services where id=$1";
                        return [4 /*yield*/, conn.query(sql, [sid])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        if (result.rowCount > 0) {
                            return [2 /*return*/, true];
                        }
                        else {
                            return [2 /*return*/, false];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_6 = _a.sent();
                        throw new Error("Row Couldnt be Deleted : ".concat(err_6));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Service.prototype.getServiceById = function (sid) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT * FROM services where id=$1";
                        return [4 /*yield*/, conn.query(sql, [sid])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        if (result.rowCount > 0) {
                            return [2 /*return*/, result.rows[0]];
                        }
                        else {
                            return [2 /*return*/, "No Service With id : ".concat(sid)];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_7 = _a.sent();
                        throw new Error("Couldnt Get service:".concat(err_7));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Service.prototype.updateService = function (sid, status) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, sql2, result2, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "update services set status=$1 where id=$2";
                        return [4 /*yield*/, conn.query(sql, [status, sid])];
                    case 2:
                        result = _a.sent();
                        if (!(result.rowCount > 0)) return [3 /*break*/, 4];
                        sql2 = "SELECT * FROM services where id=$1";
                        return [4 /*yield*/, conn.query(sql2, [sid])];
                    case 3:
                        result2 = _a.sent();
                        return [2 /*return*/, result2.rows[0]];
                    case 4: return [2 /*return*/, null];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_8 = _a.sent();
                        throw new Error("Couldnt update the service:".concat(err_8));
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return Service;
}());
exports.default = Service;
