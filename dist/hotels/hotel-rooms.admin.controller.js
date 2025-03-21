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
exports.HotelRoomsAdminController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const hotels_service_1 = require("./hotels.service");
const create_hotel_room_dto_1 = require("./dto/create-hotel-room.dto");
const update_hotel_room_dto_1 = require("./dto/update-hotel-room.dto");
const authenticated_guard_1 = require("../auth/guards/authenticated.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const common_2 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
let HotelRoomsAdminController = class HotelRoomsAdminController {
    constructor(hotelsService) {
        this.hotelsService = hotelsService;
    }
    createHotelRoom(files, createHotelRoomDto) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            // Преобразуем hotelId из строки в ObjectId
            const hotelObjectId = new mongoose_1.Types.ObjectId(createHotelRoomDto.hotelId);
            // Формируем URL для файлов, например: /uploads/<имя_файла>
            const imageUrls = files.map(file => `/uploads/${file.filename}`);
            const room = yield this.hotelsService.createHotelRoom({
                description: createHotelRoomDto.description,
                hotel: hotelObjectId,
                images: imageUrls,
                isEnabled: true,
            });
            return {
                id: room._id,
                description: room.description,
                images: room.images,
                isEnabled: room.isEnabled,
                hotel: {
                    id: ((_a = room.hotel) === null || _a === void 0 ? void 0 : _a._id) || room.hotel,
                    title: (_b = room.hotel) === null || _b === void 0 ? void 0 : _b.title,
                    description: (_c = room.hotel) === null || _c === void 0 ? void 0 : _c.description,
                },
            };
        });
    }
    updateHotelRoom(id, files, updateHotelRoomDto) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            // Получаем текущие данные комнаты из базы
            const existingRoom = yield this.hotelsService.findHotelRoomById(id);
            if (!existingRoom) {
                throw new common_2.NotFoundException('Hotel room not found');
            }
            // Получаем текущие изображения из базы
            const existingImages = existingRoom.images || [];
            const newImages = files.map(file => `/uploads/${file.filename}`);
            // Объединяем старые и новые изображения
            const updatedImages = [...existingImages, ...newImages];
            let updateData = Object.assign(Object.assign({}, updateHotelRoomDto), { images: updatedImages });
            if (updateData.hotelId) {
                updateData.hotel = new mongoose_1.Types.ObjectId(updateData.hotelId);
                delete updateData.hotelId;
            }
            const room = yield this.hotelsService.updateHotelRoom(id, updateData);
            return {
                id: room._id,
                description: room.description,
                images: room.images,
                isEnabled: room.isEnabled,
                hotel: {
                    id: ((_a = room.hotel) === null || _a === void 0 ? void 0 : _a._id) || room.hotel,
                    title: (_b = room.hotel) === null || _b === void 0 ? void 0 : _b.title,
                    description: (_c = room.hotel) === null || _c === void 0 ? void 0 : _c.description,
                },
            };
        });
    }
};
exports.HotelRoomsAdminController = HotelRoomsAdminController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images')),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, create_hotel_room_dto_1.CreateHotelRoomDto]),
    __metadata("design:returntype", Promise)
], HotelRoomsAdminController.prototype, "createHotelRoom", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array, update_hotel_room_dto_1.UpdateHotelRoomDto]),
    __metadata("design:returntype", Promise)
], HotelRoomsAdminController.prototype, "updateHotelRoom", null);
exports.HotelRoomsAdminController = HotelRoomsAdminController = __decorate([
    (0, common_1.Controller)('api/admin/hotel-rooms'),
    (0, common_1.UseGuards)(authenticated_guard_1.AuthenticatedGuard, roles_guard_1.RolesGuard),
    (0, common_2.SetMetadata)('roles', ['admin']),
    __metadata("design:paramtypes", [hotels_service_1.HotelsService])
], HotelRoomsAdminController);
