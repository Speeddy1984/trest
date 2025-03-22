"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const support_request_schema_1 = require("./schemas/support-request.schema");
const message_schema_1 = require("./schemas/message.schema");
const support_service_1 = require("./support.service");
const support_client_controller_1 = require("./support.client.controller");
const support_manager_controller_1 = require("./support.manager.controller");
const support_common_controller_1 = require("./support.common.controller");
const support_gateway_1 = require("./support.gateway");
let SupportModule = class SupportModule {
};
exports.SupportModule = SupportModule;
exports.SupportModule = SupportModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: support_request_schema_1.SupportRequest.name, schema: support_request_schema_1.SupportRequestSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: message_schema_1.Message.name, schema: message_schema_1.MessageSchema }]),
        ],
        providers: [support_service_1.SupportService, support_gateway_1.SupportGateway],
        exports: [support_service_1.SupportService],
        controllers: [support_client_controller_1.SupportClientController, support_manager_controller_1.SupportManagerController, support_common_controller_1.SupportCommonController],
    })
], SupportModule);
