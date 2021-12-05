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
var complaint_1 = __importDefault(require("../modules/complaint"));
var dashboard_1 = __importDefault(require("../modules/services/dashboard"));
var dashboard_2 = require("./services/dashboard");
var mail_1 = __importDefault(require("@sendgrid/mail"));
var mail_api = process.env.mail_api;
var dashboard = new dashboard_1.default();
var complaintObject = new complaint_1.default();
var create = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, complaintInfo, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = _req.body;
                complaintInfo = {
                    image: body.image,
                    description: body.description,
                    place_name: body.place_name,
                    nearest_attraction: body.nearest_attraction,
                    public: body.public
                };
                return [4 /*yield*/, complaintObject.create(complaintInfo)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); };
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var status, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                status = String(_req.query.status);
                return [4 /*yield*/, complaintObject.index(status)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); };
var getComplaintById = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = _req.params.id;
                return [4 /*yield*/, complaintObject.getComplaintById(Number(id))];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); };
var completed = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cid, result, userInfo, msg;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cid = _req.params.id;
                return [4 /*yield*/, complaintObject.complete(Number(cid))];
            case 1:
                result = _a.sent();
                if (!result) return [3 /*break*/, 4];
                return [4 /*yield*/, dashboard.getUserInfoFromComplaint(cid)];
            case 2:
                userInfo = _a.sent();
                mail_1.default.setApiKey(mail_api);
                msg = {
                    to: userInfo.email,
                    from: 'omaraljoundi@gmail.com',
                    templateId: "d-1deb2298c3c340fe8d6825d6d80fcdd5",
                    dynamicTemplateData: {
                        name: userInfo.name,
                        public: result.public,
                        nearestPlace: result.nearest_attraction,
                        area: result.place_name,
                        topic: result.description,
                        date: result.create_at,
                        cid: result.id
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
                _a.sent();
                return [2 /*return*/, res.status(201).json("Complaint with id: ".concat(cid, " has been completed"))];
            case 4: return [2 /*return*/];
        }
    });
}); };
var complaint_routes = function (app) {
    app.post('/complaints', dashboard_2.verifyAuthToken, create);
    app.get('/complaints', dashboard_2.verifyAuthToken, index);
    app.get('/complaints/:id', dashboard_2.verifyAuthToken, getComplaintById);
    app.put('/complaints/:id', dashboard_2.verifyAuthToken, completed);
};
exports.default = complaint_routes;
