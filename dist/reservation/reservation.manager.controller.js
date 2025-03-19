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
exports.ReservationManagerController = void 0;
const common_1 = require("@nestjs/common");
const reservation_service_1 = require("./reservation.service");
const authenticated_guard_1 = require("../auth/guards/authenticated.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const common_2 = require("@nestjs/common");
let ReservationManagerController = class ReservationManagerController {
    constructor(reservationService) {
        this.reservationService = reservationService;
    }
    getReservationsByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservations = yield this.reservationService.getReservations({ userId });
            return reservations;
        });
    }
    removeReservation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.reservationService.removeReservation(id);
            return {};
        });
    }
};
exports.ReservationManagerController = ReservationManagerController;
__decorate([
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReservationManagerController.prototype, "getReservationsByUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReservationManagerController.prototype, "removeReservation", null);
exports.ReservationManagerController = ReservationManagerController = __decorate([
    (0, common_1.Controller)('api/manager/reservations'),
    (0, common_1.UseGuards)(authenticated_guard_1.AuthenticatedGuard, roles_guard_1.RolesGuard),
    (0, common_2.SetMetadata)('roles', ['manager']),
    __metadata("design:paramtypes", [reservation_service_1.ReservationService])
], ReservationManagerController);
