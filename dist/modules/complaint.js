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
var Complaint = /** @class */ (function () {
    function Complaint() {
    }
    //End User Methods 
    Complaint.prototype.create = function (c) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "INSERT INTO complaints(image,description,nearest_attraction,public,place_name,user_id) values($1,$2,$3,$4,$5,$6)";
                        return [4 /*yield*/, conn.query(sql, [c.image, c.description, c.nearest_attraction, c.public, c.place_name, dashboard_1.authedUser.id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Could not insert Complaints ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Ranger Methods
    Complaint.prototype.complete = function (cid) {
        return __awaiter(this, void 0, void 0, function () {
            var status_1, conn, sql, result, result_1, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        status_1 = "completed";
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "update complaints set status=$1 where id = $2";
                        return [4 /*yield*/, conn.query(sql, [status_1, cid])];
                    case 2:
                        result = _a.sent();
                        if (!(result.rowCount > 0)) return [3 /*break*/, 4];
                        sql = "SELECT * from complaints where id=$1";
                        return [4 /*yield*/, conn.query(sql, [cid])];
                    case 3:
                        result_1 = _a.sent();
                        return [2 /*return*/, result_1.rows[0]];
                    case 4: return [2 /*return*/, null];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_2 = _a.sent();
                        throw new Error("Something went wrong:".concat(err_2));
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    // All users Methods
    Complaint.prototype.index = function (status) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, result, conn, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        sql = void 0;
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        console.log(status);
                        if (!(status === "undefined")) return [3 /*break*/, 3];
                        sql = "SELECT * from complaints where user_id = $1";
                        return [4 /*yield*/, conn.query(sql, [dashboard_1.authedUser.id])];
                    case 2:
                        result = _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        sql = "SELECT * from complaints where status=$1 AND user_id=$2";
                        return [4 /*yield*/, conn.query(sql, [status, dashboard_1.authedUser.id])];
                    case 4:
                        result = _a.sent();
                        _a.label = 5;
                    case 5:
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 6:
                        err_3 = _a.sent();
                        throw new Error("Something went wrong: ".concat(err_3));
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Complaint.prototype.getComplaintById = function (cid) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT * FROM complaints where id=$1";
                        return [4 /*yield*/, conn.query(sql, [cid])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("Something went wrong ".concat(err_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Complaint;
}());
exports.default = Complaint;
