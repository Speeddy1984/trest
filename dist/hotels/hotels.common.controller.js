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
exports.HotelsCommonController = void 0;
const common_1 = require("@nestjs/common");
const hotels_service_1 = require("./hotels.service");
const search_hotel_room_dto_1 = require("./dto/search-hotel-room.dto");
let HotelsCommonController = class HotelsCommonController {
    constructor(hotelsService) {
        this.hotelsService = hotelsService;
    }
    searchHotelRooms(searchHotelRoomDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const rooms = yield this.hotelsService.searchHotelRooms({
                limit: searchHotelRoomDto.limit || 10,
                offset: searchHotelRoomDto.offset || 0,
                hotel: searchHotelRoomDto.hotel,
                isEnabled: typeof searchHotelRoomDto.isEnabled === 'boolean'
                    ? searchHotelRoomDto.isEnabled
                    : true,
            });
            return rooms.map(room => {
                var _a, _b;
                return ({
                    id: room._id,
                    description: room.description,
                    images: room.images,
                    hotel: {
                        id: ((_a = room.hotel) === null || _a === void 0 ? void 0 : _a._id) || room.hotel,
                        title: (_b = room.hotel) === null || _b === void 0 ? void 0 : _b.title,
                    },
                });
            });
        });
    }
    getHotelRoomById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const room = yield this.hotelsService.findHotelRoomById(id);
            return {
                id: room._id,
                description: room.description,
                images: room.images,
                hotel: {
                    id: ((_a = room.hotel) === null || _a === void 0 ? void 0 : _a._id) || room.hotel,
                    title: (_b = room.hotel) === null || _b === void 0 ? void 0 : _b.title,
                    description: (_c = room.hotel) === null || _c === void 0 ? void 0 : _c.description,
                },
            };
        });
    }
};
exports.HotelsCommonController = HotelsCommonController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_hotel_room_dto_1.SearchHotelRoomDto]),
    __metadata("design:returntype", Promise)
], HotelsCommonController.prototype, "searchHotelRooms", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HotelsCommonController.prototype, "getHotelRoomById", null);
exports.HotelsCommonController = HotelsCommonController = __decorate([
    (0, common_1.Controller)('api/common/hotel-rooms'),
    __metadata("design:paramtypes", [hotels_service_1.HotelsService])
], HotelsCommonController);
