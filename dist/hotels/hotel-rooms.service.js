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
exports.HotelRoomsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const hotel_room_schema_1 = require("./schemas/hotel-room.schema");
let HotelRoomsService = class HotelRoomsService {
    constructor(hotelRoomModel) {
        this.hotelRoomModel = hotelRoomModel;
    }
    search(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit, offset, hotel, isEnabled } = params;
            const query = {};
            if (hotel)
                query.hotel = hotel;
            if (isEnabled !== undefined)
                query.isEnabled = isEnabled;
            const rooms = yield this.hotelRoomModel
                .find(query)
                .skip(offset || 0)
                .limit(limit || 10)
                .populate('hotel', 'id title')
                .exec();
            return rooms.map((room) => ({
                id: room._id,
                description: room.description,
                images: room.images,
                hotel: {
                    id: room.hotel._id,
                    title: room.hotel.title,
                },
            }));
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield this.hotelRoomModel
                .findById(id)
                .populate('hotel', 'id title description')
                .exec();
            if (!room) {
                throw new common_1.NotFoundException('Room not found');
            }
            return {
                id: room._id,
                description: room.description,
                images: room.images,
                hotel: {
                    id: room.hotel._id,
                    title: room.hotel.title,
                    description: room.hotel.description,
                },
            };
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { hotelId, description, images } = data;
            const room = new this.hotelRoomModel({
                hotel: hotelId,
                description,
                images,
            });
            return room.save();
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield this.hotelRoomModel
                .findByIdAndUpdate(id, data, { new: true })
                .exec();
            if (!room) {
                throw new common_1.NotFoundException('Room not found');
            }
            return room;
        });
    }
};
exports.HotelRoomsService = HotelRoomsService;
exports.HotelRoomsService = HotelRoomsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(hotel_room_schema_1.HotelRoom.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], HotelRoomsService);
