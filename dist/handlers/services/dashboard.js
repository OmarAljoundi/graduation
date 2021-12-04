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
exports.isRanger = exports.isUserVaild = exports.isUserExist = exports.verifyAuthToken = exports.authedUser = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dashboard_1 = __importDefault(require("../../modules/services/dashboard"));
var dashboardObject = new dashboard_1.default();
var verifyAuthToken = function (req, res, next) {
    var TOKEN_SECRET = process.env.TOKEN_SECRET;
    try {
        var authorizationHeader = req.headers.authorization;
        var token = authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(String(token), String(TOKEN_SECRET), function (err, decoded) {
            if (decoded) {
                exports.authedUser = decoded.user;
                next();
            }
            else {
                return res.send(401).json("Authentication Required! Please Sign up, or sign in if You already have an account.");
            }
        });
    }
    catch (error) {
        return res.send(401).json("Authentication Required! Please Sign up, or sign in if You already have an account.");
    }
};
exports.verifyAuthToken = verifyAuthToken;
var isUserExist = function (_req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var phone_number, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                phone_number = _req.body.phone_number;
                return [4 /*yield*/, dashboardObject.isUserExist(phone_number)];
            case 1:
                result = _a.sent();
                if (result) {
                    return [2 /*return*/, res.json({ status: 403, message: "An account with the same phone number is registered" })];
                }
                else {
                    next();
                }
                return [2 /*return*/];
        }
    });
}); };
exports.isUserExist = isUserExist;
var isUserVaild = function (_req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var phone_number, result, vertifiy;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                phone_number = _req.body.phone_number;
                return [4 /*yield*/, dashboardObject.isUserExist(phone_number)];
            case 1:
                result = _a.sent();
                if (!result) return [3 /*break*/, 3];
                return [4 /*yield*/, dashboardObject.isUserVertified(phone_number)];
            case 2:
                vertifiy = _a.sent();
                if (vertifiy) {
                    next();
                }
                else {
                    return [2 /*return*/, res.json({ status: 403, message: "You Should Vertifiy Your Account" })];
                }
                return [3 /*break*/, 4];
            case 3: return [2 /*return*/, res.json({ status: 204, message: "No Account Found, try sign up first" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.isUserVaild = isUserVaild;
var isRanger = function (_req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (exports.authedUser.user_type === "ranger") {
            next();
        }
        else {
            return [2 /*return*/, res.json({
                    status: 404,
                    message: "Unauthorized!"
                })];
        }
        return [2 /*return*/];
    });
}); };
exports.isRanger = isRanger;
