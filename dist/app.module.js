"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const event_emitter_1 = require("@nestjs/event-emitter");
const users_module_1 = require("./users/users.module");
const hotels_module_1 = require("./hotels/hotels.module");
const reservation_module_1 = require("./reservation/reservation.module");
const support_module_1 = require("./support/support.module");
const auth_module_1 = require("./auth/auth.module"); // Импортируем модуль аутентификации
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            event_emitter_1.EventEmitterModule.forRoot(), // Подключаем EventEmitter
            mongoose_1.MongooseModule.forRoot('mongodb+srv://speeddy1984:8dZnh1d9xCOJvgUg@diploma-cluster.1elyi.mongodb.net/?retryWrites=true&w=majority&appName=diploma-cluster'),
            users_module_1.UsersModule, // Модуль пользователей
            hotels_module_1.HotelsModule, // Модуль гостиниц
            reservation_module_1.ReservationModule, // Модуль бронирования
            support_module_1.SupportModule, // Модуль чата поддержки
            auth_module_1.AuthModule, // Модуль аутентификации
        ],
    })
], AppModule);
