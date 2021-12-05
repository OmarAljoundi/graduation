"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var user_1 = __importDefault(require("./handlers/user"));
var service_1 = __importDefault(require("./handlers/service"));
var complaint_1 = __importDefault(require("./handlers/complaint"));
var ranger_1 = __importDefault(require("./handlers/ranger"));
exports.app = (0, express_1.default)();
var address = "0.0.0.0:5000";
exports.app.use(body_parser_1.default.json(), (0, cors_1.default)());
exports.app.get("/", function (req, res) {
    return res.send("Hello World!");
});
(0, service_1.default)(exports.app);
(0, user_1.default)(exports.app);
(0, complaint_1.default)(exports.app);
(0, ranger_1.default)(exports.app);
exports.app.listen(5000, function () {
    console.log("starting app on: ".concat(address));
});
