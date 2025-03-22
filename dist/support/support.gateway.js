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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
let SupportGateway = class SupportGateway {
    constructor() {
        this.logger = new common_1.Logger('SupportGateway');
    }
    afterInit(server) {
        this.server = server;
        this.logger.log('SupportGateway initialized');
    }
    handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    handleSubscribeToChat(payload, client) {
        client.join(payload.chatId);
        this.logger.log(`Client ${client.id} joined chat room: ${payload.chatId}`);
    }
    broadcastNewMessage(chatId, message) {
        this.server.to(chatId).emit('newMessage', message);
        this.logger.log(`Broadcasted new message to chat ${chatId}`);
    }
};
exports.SupportGateway = SupportGateway;
__decorate([
    (0, websockets_1.SubscribeMessage)('subscribeToChat'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], SupportGateway.prototype, "handleSubscribeToChat", null);
exports.SupportGateway = SupportGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ namespace: '/support' })
], SupportGateway);
