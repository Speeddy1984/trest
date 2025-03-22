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
exports.SupportClientController = void 0;
const common_1 = require("@nestjs/common");
const support_service_1 = require("./support.service");
const authenticated_guard_1 = require("../auth/guards/authenticated.guard");
const common_2 = require("@nestjs/common");
const create_support_request_dto_1 = require("./dto/create-support-request.dto");
let SupportClientController = class SupportClientController {
    constructor(supportService) {
        this.supportService = supportService;
    }
    // Создание обращения в поддержку
    createSupportRequest(createSupportRequestDto, req) {
        return __awaiter(this, void 0, void 0, function* () {
            // Берем user из сессии
            const userId = req.user['_id'];
            const supportRequest = yield this.supportService.createSupportRequest({
                user: userId,
                text: createSupportRequestDto.text,
            });
            return [{
                    id: supportRequest._id,
                    createdAt: supportRequest.createdAt,
                    isActive: supportRequest.isActive,
                    hasNewMessages: supportRequest.messages.some(msg => !msg.readAt),
                }];
        });
    }
    // Получение списка обращений для клиента
    getSupportRequests(limit, offset, isActive, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user['_id'];
            const filter = { user: userId };
            if (isActive !== undefined) {
                filter.isActive = isActive === 'true';
            }
            console.log('Filter:', filter, 'limit:', limit, 'offset:', offset);
            const supportRequests = yield this.supportService.getSupportRequests({
                user: userId,
                isActive: filter.isActive,
                limit,
                offset,
            });
            return supportRequests.map(supportReq => ({
                id: supportReq._id,
                createdAt: supportReq.createdAt,
                isActive: supportReq.isActive,
                hasNewMessages: supportReq.messages.some(msg => !msg.readAt),
            }));
        });
    }
};
exports.SupportClientController = SupportClientController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_support_request_dto_1.CreateSupportRequestDto, Object]),
    __metadata("design:returntype", Promise)
], SupportClientController.prototype, "createSupportRequest", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('offset', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('isActive')),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, Object]),
    __metadata("design:returntype", Promise)
], SupportClientController.prototype, "getSupportRequests", null);
exports.SupportClientController = SupportClientController = __decorate([
    (0, common_1.Controller)('api/client/support-requests'),
    (0, common_1.UseGuards)(authenticated_guard_1.AuthenticatedGuard) // доступ для аутентифицированных пользователей (роль проверяется отдельно, если нужно)
    ,
    (0, common_2.SetMetadata)('roles', ['client']),
    __metadata("design:paramtypes", [support_service_1.SupportService])
], SupportClientController);
