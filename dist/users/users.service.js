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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
const common_2 = require("@nestjs/common");
const common_3 = require("@nestjs/common");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    createAdminUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.findByEmail(data.email);
            if (existingUser) {
                throw new common_3.BadRequestException('Email already exists');
            }
            const hashedPassword = yield bcrypt.hash(data.password, 10);
            return this.userModel.create(Object.assign(Object.assign({}, data), { passwordHash: hashedPassword }));
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new this.userModel(data);
            return user.save();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findById(id).exec();
            if (!user) {
                throw new common_2.NotFoundException('User not found');
            }
            return user;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findOne({ email }).exec();
            if (!user) {
                throw new common_2.NotFoundException('User not found');
            }
            return user;
        });
    }
    findAll(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, name, contactPhone, limit, offset } = params;
            const query = {};
            if (email)
                query.email = { $regex: email, $options: 'i' };
            if (name)
                query.name = { $regex: name, $options: 'i' };
            if (contactPhone)
                query.contactPhone = { $regex: contactPhone, $options: 'i' };
            return this.userModel
                .find(query)
                .skip(offset || 0)
                .limit(limit || 10)
                .exec();
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
