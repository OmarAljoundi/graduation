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
var user_1 = __importDefault(require("../modules/user"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var twilio_1 = __importDefault(require("twilio"));
var dashboard_1 = require("./services/dashboard");
var _a = process.env, token = _a.token, sid = _a.sid, service_id = _a.service_id;
var clientServer = (0, twilio_1.default)(sid, token);
var userObject = new user_1.default();
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userObject.index()];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json(result)];
        }
    });
}); };
var register = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, userInfo, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = _req.body;
                userInfo = {
                    name: body.name,
                    b_date: body.b_date,
                    email: body.email,
                    gender: body.gender,
                    password_digest: body.password,
                    phone_number: body.phone_number,
                    nationality_id: body.nationality_id,
                    user_type: body.user_type
                };
                return [4 /*yield*/, userObject.register(userInfo)];
            case 1:
                result = _a.sent();
                if (result) {
                    clientServer.verify.services(service_id).verifications
                        .create({ to: "+962".concat(userInfo.phone_number), channel: 'sms' });
                    return [2 /*return*/, res.setHeader('phoneNumber', userInfo.phone_number).setHeader('user_id', result === null || result === void 0 ? void 0 : result.id).json("Please Vertifiy Your Phone Number")];
                }
                return [2 /*return*/];
        }
    });
}); };
var verificationsCode = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var phoneNumber, code, user_id, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                phoneNumber = _req.body.phone_number;
                code = _req.body.code;
                user_id = _req.body.user_id;
                return [4 /*yield*/, userObject.vertifiyPhoneNumber(phoneNumber, code, user_id)];
            case 1:
                result = _a.sent();
                if (result) {
                    return [2 /*return*/, res.json("Vertifed")];
                }
                else {
                    return [2 /*return*/, res.json("Not Vertified")];
                }
                return [2 /*return*/];
        }
    });
}); };
var auth = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var phoneNumber, password, result, token_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                phoneNumber = _req.body.phone_number;
                password = _req.body.password;
                return [4 /*yield*/, userObject.authenticate(phoneNumber, password)];
            case 1:
                result = _a.sent();
                if (result) {
                    token_1 = jsonwebtoken_1.default.sign({ user: result }, String(process.env.TOKEN_SECRET));
                    res.setHeader("authorization", token_1);
                    res.setHeader("Access-Control-Expose-Headers", "*");
                    res.setHeader("Access-Control-Expose-Headers", "authorization");
                    return [2 /*return*/, res.json({
                            info: result,
                            message: "Login Successfully"
                        })];
                }
                else {
                    return [2 /*return*/, res.json("couldnt Log in!")];
                }
                return [2 /*return*/];
        }
    });
}); };
var user_routes = function (app) {
    app.get('/users', index);
    app.post('/register', dashboard_1.isUserExist, register);
    app.post('/users/auth', dashboard_1.isUserVaild, auth);
    app.put('/register', verificationsCode);
};
exports.default = user_routes;
