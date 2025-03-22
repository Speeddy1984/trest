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
exports.SupportManagerController = void 0;
const common_1 = require("@nestjs/common");
const support_service_1 = require("./support.service");
const authenticated_guard_1 = require("../auth/guards/authenticated.guard");
const common_2 = require("@nestjs/common");
let SupportManagerController = class SupportManagerController {
    constructor(supportService) {
        this.supportService = supportService;
    }
    // Получение списка обращений от клиентов
    getSupportRequests(limit, offset, isActive) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = {};
            // Если isActive передан, добавляем в фильтр
            if (isActive !== undefined) {
                filter.isActive = isActive === 'true';
            }
            // Для менеджера не фильтруем по user, поэтому не передаем свойство user
            const supportRequests = yield this.supportService.getSupportRequests({
                // user: undefined, // можно и так, но лучше не указывать
                isActive: filter.isActive,
                limit,
                offset,
            });
            return supportRequests.map(req => ({
                id: req._id,
                createdAt: req.createdAt,
                isActive: req.isActive,
                hasNewMessages: req.messages.some(msg => !msg.readAt),
                client: {
                    id: req.user, // здесь можно популяцию пользователя добавить, если требуется
                    name: '', // заполните при необходимости
                    email: '',
                    contactPhone: '',
                },
            }));
        });
    }
};
exports.SupportManagerController = SupportManagerController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('offset', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], SupportManagerController.prototype, "getSupportRequests", null);
exports.SupportManagerController = SupportManagerController = __decorate([
    (0, common_1.Controller)('api/manager/support-requests'),
    (0, common_1.UseGuards)(authenticated_guard_1.AuthenticatedGuard),
    (0, common_2.SetMetadata)('roles', ['manager']),
    __metadata("design:paramtypes", [support_service_1.SupportService])
], SupportManagerController);
