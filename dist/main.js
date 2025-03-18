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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        // Настройка сессии
        app.use((0, express_session_1.default)({
            secret: 'your-secret-key',
            resave: false,
            saveUninitialized: false,
        }));
        // Инициализация Passport
        app.use(passport_1.default.initialize());
        app.use(passport_1.default.session());
        passport_1.default.serializeUser((user, done) => {
            console.log('Serializing user:', user);
            done(null, user);
        });
        passport_1.default.deserializeUser((user, done) => {
            console.log('Deserializing user:', user);
            done(null, user);
        });
        yield app.listen(3000);
    });
}
bootstrap();
