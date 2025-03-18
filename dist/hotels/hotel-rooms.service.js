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
    getRooms() {
        return __awaiter(this, void 0, void 0, function* () {
            const rooms = yield this.hotelRoomModel.find().populate('hotel');
            return rooms.map(room => {
                var _a, _b;
                return ({
                    _id: room._id,
                    title: (_a = room.hotel) === null || _a === void 0 ? void 0 : _a.title,
                    description: (_b = room.hotel) === null || _b === void 0 ? void 0 : _b.description,
                    // добавьте другие необходимые поля по заданию
                });
            });
        });
    }
    getRoomDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const room = yield this.hotelRoomModel.findById(id).populate('hotel');
            if (!room)
                return null;
            return {
                _id: room._id,
                title: (_a = room.hotel) === null || _a === void 0 ? void 0 : _a.title,
                description: (_b = room.hotel) === null || _b === void 0 ? void 0 : _b.description,
                // добавьте другие необходимые поля по заданию
            };
        });
    }
    search(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const rooms = yield this.hotelRoomModel.find(query).populate('hotel');
            return rooms.map(room => {
                var _a, _b;
                return ({
                    _id: room._id,
                    title: (_a = room.hotel) === null || _a === void 0 ? void 0 : _a.title,
                    description: (_b = room.hotel) === null || _b === void 0 ? void 0 : _b.description,
                    // добавьте другие необходимые поля по заданию
                });
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getRoomDetails(id);
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newRoom = new this.hotelRoomModel(data);
            yield newRoom.save();
            return newRoom;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield this.hotelRoomModel
                .findByIdAndUpdate(id, data, { new: true })
                .populate('hotel');
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
