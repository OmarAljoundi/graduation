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
var service_1 = __importDefault(require("../modules/service"));
var dashboard_1 = require("./services/dashboard");
var dashboard_2 = __importDefault(require("../modules/services/dashboard"));
var mail_1 = __importDefault(require("@sendgrid/mail"));
var mail_api = process.env.mail_api;
var dashboard = new dashboard_2.default();
var serviceObject = new service_1.default();
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, serviceObject.index()];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json(result)];
        }
    });
}); };
var proposalRequest = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, serviceInfo, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = _req.body;
                serviceInfo = {
                    entity_name: body.entity_name,
                    notes: body.notes,
                };
                return [4 /*yield*/, serviceObject.createProposalRequest(serviceInfo)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.status(201).json(result)];
        }
    });
}); };
var carsCheckRequest = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, serviceInfo, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = _req.body;
                serviceInfo = {
                    entity_name: body.entity_name,
                    is_company: body.is_company,
                    number_of_cars: body.number_of_cars,
                    notes: body.notes
                };
                return [4 /*yield*/, serviceObject.createCarsCheckRequest(serviceInfo)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.status(201).json(result)];
        }
    });
}); };
var nosieMeasurementRequest = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, serviceInfo, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = _req.body;
                serviceInfo = {
                    entity_name: body.entity_name,
                    notes: body.notes,
                };
                return [4 /*yield*/, serviceObject.createNosieMeasurementRequest(serviceInfo)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.status(201).json(result)];
        }
    });
}); };
var courseRequest = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, serviceInfo, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = _req.body;
                serviceInfo = {
                    entity_name: body.entity_name,
                    age_group: body.age_group,
                    expected_audience: body.expected_audience,
                    service_date: body.service_date,
                    notes: body.notes
                };
                return [4 /*yield*/, serviceObject.createCourseRequest(serviceInfo)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.status(201).json(result)];
        }
    });
}); };
var deleteRow = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = _req.params.id;
                return [4 /*yield*/, serviceObject.deleteService(Number(id))];
            case 1:
                result = _a.sent();
                if (result) {
                    return [2 /*return*/, res.status(202).json("Service has been deleted with id:".concat(id))];
                }
                else {
                    return [2 /*return*/, res.status(404).json("No Service with Id:".concat(id))];
                }
                return [2 /*return*/];
        }
    });
}); };
var getServiceById = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = _req.params.id;
                return [4 /*yield*/, serviceObject.getServiceById(Number(id))];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); };
var updateStatus = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, status, result, userInfo, msg;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = _req.params.id;
                status = _req.body.status;
                return [4 /*yield*/, serviceObject.updateService(Number(id), status)];
            case 1:
                result = _b.sent();
                if (!result) return [3 /*break*/, 4];
                return [4 /*yield*/, dashboard.getUserInfoFromService(id)];
            case 2:
                userInfo = _b.sent();
                mail_1.default.setApiKey(mail_api);
                msg = {
                    to: userInfo.email,
                    from: 'omaraljoundi@gmail.com',
                    templateId: "d-3dbd964e42a4416093efb1fc6c197aa7",
                    dynamicTemplateData: {
                        status: status === "completed" ? "قبوله" : "رفضه",
                        entity_name: result.entity_name ? result.entity_name : "لايوجد",
                        number_of_cars: result.number_of_cars ? result.number_of_cars : "لا يوجد",
                        is_company: result.is_company ? result.is_company : "لايوجد",
                        age_group: result.age_group ? result.age_group : "لايوجد",
                        expected_age: result.expected_audience ? result.expected_audience : "لايوجد",
                        service_date: result.service_date ? result.service_date.toLocaleDateString("ar-JO") : "لايوجد",
                        notes: result.notes ? result.notes : "لايوجد",
                        date: (_a = result.create_at) === null || _a === void 0 ? void 0 : _a.toLocaleDateString("ar-JO"),
                        sid: id
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
            case 3:
                _b.sent();
                return [2 /*return*/, res.status(201).json("Service with id: ".concat(id, " has been completed"))];
            case 4: return [2 /*return*/, res.status(404).json("No Service with Id:".concat(id))];
        }
    });
}); };
var service_routes = function (app) {
    app.get('/services', dashboard_1.verifyAuthToken, index);
    app.get('/services/:id', dashboard_1.verifyAuthToken, getServiceById);
    app.put('/services/:id', dashboard_1.verifyAuthToken, updateStatus);
    app.post('/services/proposal', dashboard_1.verifyAuthToken, proposalRequest);
    app.post('/services/cars_check', dashboard_1.verifyAuthToken, carsCheckRequest);
    app.post('/services/nosie_measurement', dashboard_1.verifyAuthToken, nosieMeasurementRequest);
    app.post('/services/course', dashboard_1.verifyAuthToken, courseRequest);
    app.delete('/services/:id', dashboard_1.verifyAuthToken, deleteRow);
};
exports.default = service_routes;
