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
const create_reservation_dto_1 = require("./dto/create-reservation.dto");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../users/enums/user-role.enum");
let ReservationController = class ReservationController {
    constructor(reservationService) {
        this.reservationService = reservationService;
    }
    // Бронирование номера клиентом (POST /api/client/reservations)
    create(req, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user['_id'];
            const reservation = yield this.reservationService.addReservation(userId, dto);
            // Форматирование ответа
            return {
                startDate: reservation.startDate.toISOString(),
                endDate: reservation.endDate.toISOString(),
                hotelRoom: {
                    description: reservation.hotelRoom.description,
                    images: reservation.hotelRoom.images,
                },
                hotel: {
                    title: reservation.hotelRoom.hotel.title,
                    description: reservation.hotelRoom.hotel.description,
                },
            };
        });
    }
    // Список броней текущего пользователя (GET /api/client/reservations)
    getUserReservations(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user['_id'];
            const reservations = yield this.reservationService.getReservations(userId);
            // Форматирование ответа
            return reservations.map((reservation) => ({
                startDate: reservation.startDate.toISOString(),
                endDate: reservation.endDate.toISOString(),
                hotelRoom: {
                    description: reservation.hotelRoom.description,
                    images: reservation.hotelRoom.images,
                },
                hotel: {
                    title: reservation.hotelRoom.hotel.title,
                    description: reservation.hotelRoom.hotel.description,
                },
            }));
        });
    }
    // Список броней конкретного пользователя (GET /api/manager/reservations/:userId)
    getReservationsByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservations = yield this.reservationService.getReservations(userId);
            // Форматирование ответа
            return reservations.map((reservation) => ({
                startDate: reservation.startDate.toISOString(),
                endDate: reservation.endDate.toISOString(),
                hotelRoom: {
                    description: reservation.hotelRoom.description,
                    images: reservation.hotelRoom.images,
                },
                hotel: {
                    title: reservation.hotelRoom.hotel.title,
                    description: reservation.hotelRoom.hotel.description,
                },
            }));
        });
    }
};
exports.ReservationController = ReservationController;
__decorate([
    (0, common_1.Post)('api/client/reservations'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.Client),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_reservation_dto_1.CreateReservationDto]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('api/client/reservations'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.Client),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "getUserReservations", null);
__decorate([
    (0, common_1.Get)('api/manager/reservations/:userId'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.Manager),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "getReservationsByUser", null);
exports.ReservationController = ReservationController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [reservation_service_1.ReservationService])
], ReservationController);
