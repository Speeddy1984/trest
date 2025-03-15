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
exports.SupportService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const event_emitter_1 = require("@nestjs/event-emitter");
let SupportService = class SupportService {
    constructor(supportRequestModel, messageModel, eventEmitter) {
        this.supportRequestModel = supportRequestModel;
        this.messageModel = messageModel;
        this.eventEmitter = eventEmitter;
    }
    createSupportRequest(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = new this.messageModel({
                author: data.user,
                text: data.text,
            });
            yield message.save();
            const supportRequest = new this.supportRequestModel({
                user: data.user,
                messages: [message._id],
            });
            const savedRequest = yield supportRequest.save();
            // Уведомляем о новом запросе поддержки
            this.eventEmitter.emit('supportRequest.created', savedRequest);
            return savedRequest;
        });
    }
    sendMessage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = new this.messageModel({
                author: data.author,
                supportRequest: data.supportRequest, // Добавляем supportRequest
                text: data.text,
            });
            yield message.save();
            yield this.supportRequestModel.findByIdAndUpdate(data.supportRequest, { $push: { messages: message._id } });
            this.eventEmitter.emit('message.created', message);
            return message;
        });
    }
    markMessagesAsRead(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.messageModel.updateMany({
                supportRequest: data.supportRequest, // Используем supportRequest
                author: { $ne: data.user },
                readAt: { $exists: false },
                sentAt: { $lte: data.createdBefore },
            }, { $set: { readAt: new Date() } });
            this.eventEmitter.emit('messages.read', data);
        });
    }
    findSupportRequests(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {};
            if (params.user)
                query.user = params.user;
            if (params.isActive !== undefined)
                query.isActive = params.isActive;
            return this.supportRequestModel.find(query).exec();
        });
    }
    getMessages(supportRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield this.supportRequestModel
                .findById(supportRequest)
                .populate({
                path: 'messages',
                model: 'Message', // Указываем модель для populate
            })
                .exec();
            if (!request) {
                throw new common_1.NotFoundException('Support request not found');
            }
            return request.messages; // Приводим тип
        });
    }
    getUnreadCount(supportRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.messageModel
                .countDocuments({
                supportRequest,
                readAt: { $exists: false },
            })
                .exec();
            return count;
        });
    }
    closeRequest(supportRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.supportRequestModel.findByIdAndUpdate(supportRequest, {
                isActive: false,
            });
            // Уведомляем о закрытии запроса
            this.eventEmitter.emit('supportRequest.closed', supportRequest);
        });
    }
    // Реализация метода subscribe
    subscribe(handler) {
        const listener = (message) => {
            this.supportRequestModel
                .findById(message.supportRequest)
                .then((supportRequest) => {
                if (supportRequest) {
                    handler(supportRequest, message);
                }
            });
        };
        this.eventEmitter.on('message.created', listener);
        return () => {
            this.eventEmitter.off('message.created', listener);
        };
    }
};
exports.SupportService = SupportService;
exports.SupportService = SupportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('SupportRequest')),
    __param(1, (0, mongoose_1.InjectModel)('Message')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        event_emitter_1.EventEmitter2])
], SupportService);
