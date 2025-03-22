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
exports.SupportCommonController = void 0;
const common_1 = require("@nestjs/common");
const support_service_1 = require("./support.service");
const authenticated_guard_1 = require("../auth/guards/authenticated.guard");
const send_message_dto_1 = require("./dto/send-message.dto");
const mark_messages_as_read_dto_1 = require("./dto/mark-messages-as-read.dto");
let SupportCommonController = class SupportCommonController {
    constructor(supportService) {
        this.supportService = supportService;
    }
    // Получение истории сообщений из обращения
    getMessages(supportRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = yield this.supportService.getMessages(supportRequest);
            return messages.map(msg => ({
                id: msg._id,
                createdAt: msg.sentAt, // или (msg as any).createdAt, если timestamps созданы
                text: msg.text,
                readAt: msg.readAt,
                author: {
                    id: msg.author, // если не популяровано, просто id
                    name: '', // Если нужно, можно добавить популяцию автора
                },
            }));
        });
    }
    // Отправка сообщения
    sendMessage(supportRequest, sendMessageDto, req) {
        return __awaiter(this, void 0, void 0, function* () {
            // Можно взять автора из сессии, если требуется:
            const authorId = sendMessageDto.author || req.user['_id'];
            const message = yield this.supportService.sendMessage({
                author: authorId,
                supportRequest,
                text: sendMessageDto.text,
            });
            return {
                id: message._id,
                createdAt: message.sentAt,
                text: message.text,
                readAt: message.readAt,
                author: {
                    id: message.author,
                    name: '', // можно заполнить, если популяция автора реализована
                },
            };
        });
    }
    // Отправка события, что сообщения прочитаны
    markMessagesAsRead(supportRequest, markDto, req) {
        return __awaiter(this, void 0, void 0, function* () {
            // Для простоты, здесь вызываем клиентский метод
            yield this.supportService.markMessagesAsReadClient({
                user: markDto.user,
                supportRequest,
                createdBefore: new Date(markDto.createdBefore),
            });
            return { success: true };
        });
    }
};
exports.SupportCommonController = SupportCommonController;
__decorate([
    (0, common_1.Get)(':id/messages'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SupportCommonController.prototype, "getMessages", null);
__decorate([
    (0, common_1.Post)(':id/messages'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, send_message_dto_1.SendMessageDto, Object]),
    __metadata("design:returntype", Promise)
], SupportCommonController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Post)(':id/messages/read'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, mark_messages_as_read_dto_1.MarkMessagesAsReadDto, Object]),
    __metadata("design:returntype", Promise)
], SupportCommonController.prototype, "markMessagesAsRead", null);
exports.SupportCommonController = SupportCommonController = __decorate([
    (0, common_1.Controller)('api/common/support-requests'),
    (0, common_1.UseGuards)(authenticated_guard_1.AuthenticatedGuard),
    __metadata("design:paramtypes", [support_service_1.SupportService])
], SupportCommonController);
