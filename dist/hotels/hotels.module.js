"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelsModule = void 0;
// src/hotels/hotels.module.ts
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const hotel_schema_1 = require("./schemas/hotel.schema");
const hotel_room_schema_1 = require("./schemas/hotel-room.schema");
const hotels_service_1 = require("./hotels.service");
const hotels_admin_controller_1 = require("./hotels.admin.controller");
const hotel_rooms_admin_controller_1 = require("./hotel-rooms.admin.controller");
const hotels_common_controller_1 = require("./hotels.common.controller");
let HotelsModule = class HotelsModule {
};
exports.HotelsModule = HotelsModule;
exports.HotelsModule = HotelsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: hotel_schema_1.Hotel.name, schema: hotel_schema_1.HotelSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: hotel_room_schema_1.HotelRoom.name, schema: hotel_room_schema_1.HotelRoomSchema }]),
            // Настраиваем Multer: файлы будут сохраняться в папке src/uploads,
            // а имя файла будет сгенерировано с уникальным суффиксом и оригинальным расширением.
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: './src/uploads',
                    filename: (req, file, callback) => {
                        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                        const ext = (0, path_1.extname)(file.originalname);
                        callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
                    },
                }),
            }),
        ],
        providers: [hotels_service_1.HotelsService],
        exports: [hotels_service_1.HotelsService],
        controllers: [hotels_admin_controller_1.HotelsAdminController, hotel_rooms_admin_controller_1.HotelRoomsAdminController, hotels_common_controller_1.HotelsCommonController],
    })
], HotelsModule);
