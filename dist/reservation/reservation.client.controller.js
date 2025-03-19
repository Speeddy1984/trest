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
exports.ReservationClientController = void 0;
const common_1 = require("@nestjs/common");
const reservation_service_1 = require("./reservation.service");
const authenticated_guard_1 = require("../auth/guards/authenticated.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const common_2 = require("@nestjs/common");
const create_reservation_dto_1 = require("./dto/create-reservation.dto");
let ReservationClientController = class ReservationClientController {
    constructor(reservationService) {
        this.reservationService = reservationService;
    }
    addReservation(createReservationDto, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user['_id'];
            const reservation = yield this.reservationService.addReservation({
                userId,
                hotelId: createReservationDto.hotelId,
                roomId: createReservationDto.hotelRoom,
                dateStart: new Date(createReservationDto.startDate),
                dateEnd: new Date(createReservationDto.endDate),
            });
            return reservation;
        });
    }
    getReservations(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user['_id'];
            const reservations = yield this.reservationService.getReservations({ userId });
            return reservations;
        });
    }
    removeReservation(id, req) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.reservationService.removeReservation(id);
            return {};
        });
    }
};
exports.ReservationClientController = ReservationClientController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_reservation_dto_1.CreateReservationDto, Object]),
    __metadata("design:returntype", Promise)
], ReservationClientController.prototype, "addReservation", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReservationClientController.prototype, "getReservations", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReservationClientController.prototype, "removeReservation", null);
exports.ReservationClientController = ReservationClientController = __decorate([
    (0, common_1.Controller)('api/client/reservations'),
    (0, common_1.UseGuards)(authenticated_guard_1.AuthenticatedGuard, roles_guard_1.RolesGuard),
    (0, common_2.SetMetadata)('roles', ['client']),
    __metadata("design:paramtypes", [reservation_service_1.ReservationService])
], ReservationClientController);
