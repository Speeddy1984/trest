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
exports.SupportController = void 0;
const common_1 = require("@nestjs/common");
const support_service_1 = require("./support.service");
const create_support_request_dto_1 = require("./dto/create-support-request.dto");
const send_message_dto_1 = require("./dto/send-message.dto");
const mark_messages_read_dto_1 = require("./dto/mark-messages-read.dto");
let SupportController = class SupportController {
    constructor(supportService) {
        this.supportService = supportService;
    }
    createSupportRequest(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.supportService.createSupportRequest(data);
        });
    }
    sendMessage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.supportService.sendMessage(data);
        });
    }
    markMessagesAsRead(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.supportService.markMessagesAsRead(data);
        });
    }
    getSupportRequests(userId, isActive) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.supportService.findSupportRequests({ user: userId, isActive });
        });
    }
    getMessages(requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.supportService.getMessages(requestId);
        });
    }
};
exports.SupportController = SupportController;
__decorate([
    (0, common_1.Post)('request'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_support_request_dto_1.CreateSupportRequestDto]),
    __metadata("design:returntype", Promise)
], SupportController.prototype, "createSupportRequest", null);
__decorate([
    (0, common_1.Post)('message'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_message_dto_1.SendMessageDto]),
    __metadata("design:returntype", Promise)
], SupportController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Post)('mark-as-read'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mark_messages_read_dto_1.MarkMessagesAsReadDto]),
    __metadata("design:returntype", Promise)
], SupportController.prototype, "markMessagesAsRead", null);
__decorate([
    (0, common_1.Get)('requests'),
    __param(0, (0, common_1.Query)('user')),
    __param(1, (0, common_1.Query)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], SupportController.prototype, "getSupportRequests", null);
__decorate([
    (0, common_1.Get)('messages/:requestId'),
    __param(0, (0, common_1.Param)('requestId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SupportController.prototype, "getMessages", null);
exports.SupportController = SupportController = __decorate([
    (0, common_1.Controller)('support'),
    __metadata("design:paramtypes", [support_service_1.SupportService])
], SupportController);
