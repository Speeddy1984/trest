"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const users_module_1 = require("../users/users.module");
const local_strategy_1 = require("./strategies/local.strategy");
const auth_controller_1 = require("./auth.controller");
const client_controller_1 = require("./client.controller");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [users_module_1.UsersModule, passport_1.PassportModule.register({ session: true })],
        providers: [auth_service_1.AuthService, local_strategy_1.LocalStrategy],
        controllers: [auth_controller_1.AuthController, client_controller_1.ClientController],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
