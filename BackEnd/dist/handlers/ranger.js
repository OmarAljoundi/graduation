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
var ranger_1 = __importDefault(require("../modules/ranger"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dashboard_1 = require("./services/dashboard");
var mail_1 = __importDefault(require("@sendgrid/mail"));
var mail_api = process.env.mail_api;
var rangerObject = new ranger_1.default();
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, rangerObject.index()];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json(result)];
        }
    });
}); };
var register = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, userInfo, result, msg;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = _req.body;
                userInfo = {
                    name: body.name,
                    email: body.email,
                    phone_number: body.phone_number,
                    nationality_id: body.nationality_id,
                    role: body.role
                };
                return [4 /*yield*/, rangerObject.register(userInfo)];
            case 1:
                result = _a.sent();
                if (!result) return [3 /*break*/, 3];
                mail_1.default.setApiKey(mail_api);
                msg = {
                    to: result.email,
                    from: 'omaraljoundi@gmail.com',
                    templateId: "d-a7717a54218c45dabc1dc9781fc5d626",
                    dynamicTemplateData: {
                        name: result.name,
                        username: result.nationality_id,
                        password: result.password_digest,
                    },
                };
                return [4 /*yield*/, mail_1.default
                        .send(msg)
                        .then(function () {
                        console.log('Email sent');
                    })
                        .catch(function (error) {
                        console.error(error);
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(201).json("Account Has been Created")];
            case 3: return [2 /*return*/];
        }
    });
}); };
var auth = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var nationality_id, password, result, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                nationality_id = _req.body.nationality_id;
                password = _req.body.password;
                return [4 /*yield*/, rangerObject.authenticate(nationality_id, password)];
            case 1:
                result = _a.sent();
                if (result) {
                    token = jsonwebtoken_1.default.sign({ ranger: result }, String(process.env.TOKEN_SECRET));
                    res.setHeader("authorization", token);
                    res.setHeader("Access-Control-Expose-Headers", "*");
                    res.setHeader("Access-Control-Expose-Headers", "authorization");
                    return [2 /*return*/, res.status(200).json({
                            info: result,
                            message: "Login Successfully"
                        })];
                }
                else {
                    return [2 /*return*/, res.status(204)];
                }
                return [2 /*return*/];
        }
    });
}); };
var getRangerById = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = _req.params.id;
                return [4 /*yield*/, rangerObject.getRangerById(id)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); };
var getRangerClosedService = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = _req.params.id;
                return [4 /*yield*/, rangerObject.getRangerClosedService(id)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); };
var getRangerClosedComplaint = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = _req.params.id;
                return [4 /*yield*/, rangerObject.getRangerClosedComplaint(id)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); };
var createRangerPassword = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, userInfo, result, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = _req.body;
                userInfo = {
                    password_digest: body.password,
                    nationality_id: body.nationality_id
                };
                return [4 /*yield*/, rangerObject.createRangerPassword(userInfo)];
            case 1:
                result = _a.sent();
                token = jsonwebtoken_1.default.sign({ ranger: result }, String(process.env.TOKEN_SECRET));
                res.setHeader("authorization", token);
                res.setHeader("Access-Control-Expose-Headers", "*");
                res.setHeader("Access-Control-Expose-Headers", "authorization");
                return [2 /*return*/, res.status(200).json({
                        info: result,
                        message: "Login Successfully"
                    })];
        }
    });
}); };
var ranger_routes = function (app) {
    app.get('/rangers', index);
    app.get('/rangers/:id', [dashboard_1.verifyAuthToken, dashboard_1.isRangerAccount], getRangerById);
    app.get('/rangers/services/:id', [dashboard_1.verifyAuthToken, dashboard_1.isRangerAccount], getRangerClosedService);
    app.get('/rangers/complaints/:id', [dashboard_1.verifyAuthToken, dashboard_1.isRangerAccount], getRangerClosedComplaint);
    app.post('/rangers/register', [dashboard_1.verifyAuthToken, dashboard_1.isRangerAccount], register);
    app.post('/rangers/auth', auth);
    app.put('/rangers/auth', createRangerPassword);
};
exports.default = ranger_routes;
