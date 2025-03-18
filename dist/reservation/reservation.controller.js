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
exports.ReservationController = void 0;
const common_1 = require("@nestjs/common");
const reservation_service_1 = require("./reservation.service");
let ReservationController = class ReservationController {
    constructor(reservationService) {
        this.reservationService = reservationService;
    }
    createReservation(req, body) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            const userId = req.user['_id'];
            const reservation = yield this.reservationService.createReservation(userId, body);
            return {
                _id: reservation._id,
                description: (_a = reservation.hotelRoom) === null || _a === void 0 ? void 0 : _a.description,
                images: (_b = reservation.hotelRoom) === null || _b === void 0 ? void 0 : _b.images,
                title: (_d = (_c = reservation.hotelRoom) === null || _c === void 0 ? void 0 : _c.hotel) === null || _d === void 0 ? void 0 : _d.title,
                hotelDescription: (_f = (_e = reservation.hotelRoom) === null || _e === void 0 ? void 0 : _e.hotel) === null || _f === void 0 ? void 0 : _f.description,
                // добавьте другие необходимые поля по заданию
            };
        });
    }
    updateReservation(req, body) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            const userId = req.user['_id'];
            const reservation = yield this.reservationService.updateReservation(userId, body);
            return {
                _id: reservation._id,
                description: (_a = reservation.hotelRoom) === null || _a === void 0 ? void 0 : _a.description,
                images: (_b = reservation.hotelRoom) === null || _b === void 0 ? void 0 : _b.images,
                title: (_d = (_c = reservation.hotelRoom) === null || _c === void 0 ? void 0 : _c.hotel) === null || _d === void 0 ? void 0 : _d.title,
                hotelDescription: (_f = (_e = reservation.hotelRoom) === null || _e === void 0 ? void 0 : _e.hotel) === null || _f === void 0 ? void 0 : _f.description,
                // добавьте другие необходимые поля по заданию
            };
        });
    }
    getReservations(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user['_id'];
            const reservations = yield this.reservationService.getReservations(userId);
            return reservations.map((reservation) => {
                var _a, _b, _c, _d, _e, _f;
                return ({
                    _id: reservation._id,
                    description: (_a = reservation.hotelRoom) === null || _a === void 0 ? void 0 : _a.description,
                    images: (_b = reservation.hotelRoom) === null || _b === void 0 ? void 0 : _b.images,
                    title: (_d = (_c = reservation.hotelRoom) === null || _c === void 0 ? void 0 : _c.hotel) === null || _d === void 0 ? void 0 : _d.title,
                    hotelDescription: (_f = (_e = reservation.hotelRoom) === null || _e === void 0 ? void 0 : _e.hotel) === null || _f === void 0 ? void 0 : _f.description,
                    // добавьте другие необходимые поля по заданию
                });
            });
        });
    }
};
exports.ReservationController = ReservationController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "createReservation", null);
__decorate([
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "updateReservation", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "getReservations", null);
exports.ReservationController = ReservationController = __decorate([
    (0, common_1.Controller)('reservations'),
    __metadata("design:paramtypes", [reservation_service_1.ReservationService])
], ReservationController);
