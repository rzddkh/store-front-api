"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var user_handler_1 = __importDefault(require("./handlers/user-handler"));
var app = (0, express_1["default"])();
var address = "0.0.0.0:3000";
app.use(body_parser_1["default"].urlencoded({ extended: true }));
app.use(body_parser_1["default"].json());
app.get('/', function (_req, res) {
    res.send('Hello World!');
});
app.get('/hel', function (_req, res) {
    res.send('Hello World!');
});
(0, user_handler_1["default"])(app);
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
