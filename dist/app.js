"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = __importDefault(require("./app/config/middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/config/middlewares/notFound"));
const routes_1 = __importDefault(require("./app/routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: 'https://shiny-car-washing-service.netlify.app', // Note no trailing slash
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use('/api', routes_1.default);
app.use(globalErrorHandler_1.default);
app.get('/', (req, res) => {
    res.send('Hello Bangladesh of the World!');
});
app.use(notFound_1.default);
exports.default = app;
