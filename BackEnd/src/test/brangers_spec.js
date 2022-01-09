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
var supertest_1 = __importDefault(require("supertest"));
var server_1 = require("../server");
var req = (0, supertest_1.default)(server_1.app);
var token;
describe("Test For Rangers Class", function () {
    it("Register As an admin of the Rangers ..", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req
                        .post('/admin/register')
                        .send({
                        name: "Abduallah Jabsini",
                        email: "omaraljoundi@gmail.com",
                        password: "123456",
                        phone_number: "0790174141",
                        nationality_id: "1234567123",
                        role: "Read / Execute / Create"
                    })
                        .set("Accept", "application/json")];
                case 1:
                    res = _a.sent();
                    expect(res.status).toEqual(201);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Login As an admin of the Rangers ..", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req
                        .post('/rangers/auth')
                        .send({
                        nationality_id: "1234567123",
                        password: "123456",
                    })
                        .set("Accept", "application/json")];
                case 1:
                    res = _a.sent();
                    token = "Bearer ".concat(res.header.authorization);
                    expect(res.status).toEqual(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Create A New Ranger user with role (Read / Execute), Password should be auto generated and sent to the user through email", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req
                        .post('/rangers/register')
                        .send({
                        name: "Omar Aljoundi",
                        email: "omaraljoundi@gmail.com",
                        phone_number: "0790174568",
                        nationality_id: "2001926511",
                        role: "Read / Execute"
                    })
                        .set("authorization", token)];
                case 1:
                    res = _a.sent();
                    expect(res.status).toEqual(201);
                    return [2 /*return*/];
            }
        });
    }); });
});
