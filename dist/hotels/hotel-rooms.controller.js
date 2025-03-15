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
exports.HotelRoomsController = void 0;
const common_1 = require("@nestjs/common");
const hotel_rooms_service_1 = require("./hotel-rooms.service");
const create_hotel_room_dto_1 = require("./dto/create-hotel-room.dto");
const update_hotel_room_dto_1 = require("./dto/update-hotel-room.dto");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../users/enums/user-role.enum");
const platform_express_1 = require("@nestjs/platform-express");
let HotelRoomsController = class HotelRoomsController {
    constructor(hotelRoomsService) {
        this.hotelRoomsService = hotelRoomsService;
    }
    search(limit, offset, hotelId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const isEnabled = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) === user_role_enum_1.UserRole.Admin ? undefined : true;
            return this.hotelRoomsService.search({ limit, offset, hotel: hotelId, isEnabled });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.hotelRoomsService.findById(id);
        });
    }
    createRoom(data, images) {
        return __awaiter(this, void 0, void 0, function* () {
            const imageUrls = images.map((file) => file.path); // Сохраняем пути к файлам
            return this.hotelRoomsService.create(Object.assign(Object.assign({}, data), { images: imageUrls }));
        });
    }
    updateRoom(id, data, images) {
        return __awaiter(this, void 0, void 0, function* () {
            const imageUrls = images.map((file) => file.path); // Сохраняем пути к файлам
            return this.hotelRoomsService.update(id, Object.assign(Object.assign({}, data), { images: imageUrls }));
        });
    }
};
exports.HotelRoomsController = HotelRoomsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('offset')),
    __param(2, (0, common_1.Query)('hotel')),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, Object]),
    __metadata("design:returntype", Promise)
], HotelRoomsController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HotelRoomsController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images')),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.Admin),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_hotel_room_dto_1.CreateHotelRoomDto, Array]),
    __metadata("design:returntype", Promise)
], HotelRoomsController.prototype, "createRoom", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images')),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.Admin),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_hotel_room_dto_1.UpdateHotelRoomDto, Array]),
    __metadata("design:returntype", Promise)
], HotelRoomsController.prototype, "updateRoom", null);
exports.HotelRoomsController = HotelRoomsController = __decorate([
    (0, common_1.Controller)('api/common/hotel-rooms'),
    __metadata("design:paramtypes", [hotel_rooms_service_1.HotelRoomsService])
], HotelRoomsController);
