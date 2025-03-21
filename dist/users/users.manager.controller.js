"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersManagerController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const search_user_dto_1 = require("./dto/search-user.dto");
const roles_guard_1 = require("../auth/guards/roles.guard");
const authenticated_guard_1 = require("../auth/guards/authenticated.guard");
const common_2 = require("@nestjs/common");
let UsersManagerController = class UsersManagerController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    findAll(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.usersService.findAll(params);
            return users.map(user => ({
                id: user._id,
                email: user.email,
                name: user.name,
                contactPhone: user.contactPhone,
            }));
        });
    }
};
exports.UsersManagerController = UsersManagerController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_user_dto_1.SearchUserDto]),
    __metadata("design:returntype", Promise)
], UsersManagerController.prototype, "findAll", null);
exports.UsersManagerController = UsersManagerController = __decorate([
    (0, common_1.Controller)('api/manager/users'),
    (0, common_1.UseGuards)(authenticated_guard_1.AuthenticatedGuard, roles_guard_1.RolesGuard),
    (0, common_2.SetMetadata)('roles', ['manager']),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersManagerController);
