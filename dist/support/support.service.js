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
const support_request_schema_1 = require("./schemas/support-request.schema");
const message_schema_1 = require("./schemas/message.schema");
const mongoose_2 = require("mongoose");
const event_emitter_1 = require("@nestjs/event-emitter");
const support_gateway_1 = require("./support.gateway");
let SupportService = class SupportService {
    constructor(supportRequestModel, messageModel, eventEmitter, supportGateway) {
        this.supportRequestModel = supportRequestModel;
        this.messageModel = messageModel;
        this.eventEmitter = eventEmitter;
        this.supportGateway = supportGateway;
    }
    // Клиентский сервис
    createSupportRequest(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newRequest = new this.supportRequestModel({
                user: new mongoose_2.Types.ObjectId(data.user),
                messages: [{
                        author: new mongoose_2.Types.ObjectId(data.user),
                        text: data.text,
                    }],
                isActive: true,
            });
            return newRequest.save();
        });
    }
    markMessagesAsReadClient(params) {
        return __awaiter(this, void 0, void 0, function* () {
            // Обновляем все сообщения, которые были отправлены не этим пользователем и не прочитаны
            yield this.supportRequestModel.updateOne({ _id: new mongoose_2.Types.ObjectId(params.supportRequest) }, {
                $set: {
                    'messages.$[elem].readAt': new Date(),
                },
            }, {
                arrayFilters: [{ 'elem.author': { $ne: new mongoose_2.Types.ObjectId(params.user) }, 'elem.sentAt': { $lte: params.createdBefore } }],
            });
        });
    }
    getUnreadCountClient(supportRequest, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield this.supportRequestModel.findById(supportRequest);
            if (!request) {
                throw new common_1.NotFoundException('Support request not found');
            }
            // Считаем сообщения, отправленные не этим пользователем и без readAt
            return request.messages.filter(msg => msg.author.toString() !== user && !msg.readAt).length;
        });
    }
    // Сервис для сотрудников (менеджеров)
    markMessagesAsReadEmployee(params) {
        return __awaiter(this, void 0, void 0, function* () {
            // Обновляем сообщения, отправленные пользователем (клиентом), которые не прочитаны
            yield this.supportRequestModel.updateOne({ _id: new mongoose_2.Types.ObjectId(params.supportRequest) }, {
                $set: {
                    'messages.$[elem].readAt': new Date(),
                },
            }, {
                arrayFilters: [{ 'elem.author': { $eq: new mongoose_2.Types.ObjectId(params.user) }, 'elem.sentAt': { $lte: params.createdBefore } }],
            });
        });
    }
    getUnreadCountEmployee(supportRequest, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield this.supportRequestModel.findById(supportRequest);
            if (!request) {
                throw new common_1.NotFoundException('Support request not found');
            }
            // Считаем сообщения, отправленные этим пользователем (клиентом) без readAt
            return request.messages.filter(msg => msg.author.toString() === user && !msg.readAt).length;
        });
    }
    closeRequest(supportRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.supportRequestModel.findByIdAndUpdate(supportRequest, { isActive: false });
        });
    }
    getSupportRequests(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const query = {};
            if (filter.user) {
                query.user = new mongoose_2.Types.ObjectId(filter.user);
            }
            if (typeof filter.isActive === 'boolean') {
                query.isActive = filter.isActive;
            }
            const results = yield this.supportRequestModel
                .find(query)
                .limit((_a = filter.limit) !== null && _a !== void 0 ? _a : 10)
                .skip((_b = filter.offset) !== null && _b !== void 0 ? _b : 0)
                .exec();
            console.log('Found supportRequests length:', results.length);
            return results;
        });
    }
    getMessages(supportRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield this.supportRequestModel.findById(supportRequest);
            if (!request) {
                throw new common_1.NotFoundException('Support request not found');
            }
            return request.messages;
        });
    }
    sendMessage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield this.supportRequestModel.findById(data.supportRequest);
            if (!request) {
                throw new common_1.NotFoundException('Support request not found');
            }
            const newMessage = {
                author: new mongoose_2.Types.ObjectId(data.author),
                text: data.text,
                sentAt: new Date(),
            };
            request.messages.push(newMessage);
            yield request.save();
            // Трансляция нового сообщения через WebSocket
            this.supportGateway.broadcastNewMessage(data.supportRequest, newMessage);
            return newMessage;
        });
    }
    subscribe(handler) {
        this.eventEmitter.on('support.message', handler);
        return () => this.eventEmitter.off('support.message', handler);
    }
};
exports.SupportService = SupportService;
exports.SupportService = SupportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(support_request_schema_1.SupportRequest.name)),
    __param(1, (0, mongoose_1.InjectModel)(message_schema_1.Message.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        event_emitter_1.EventEmitter2,
        support_gateway_1.SupportGateway])
], SupportService);
