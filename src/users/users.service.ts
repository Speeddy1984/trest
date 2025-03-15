import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createAdminUser(data: CreateUserAdminDto) {
    const existingUser = await this.findByEmail(data.email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
  
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.userModel.create({
      ...data,
      passwordHash: hashedPassword,
    });
  }

  async create(data: CreateUserDto): Promise<User> {
    const user = new this.userModel(data);
    return user.save();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findAll(params: SearchUserDto): Promise<User[]> {
    const { email, name, contactPhone, limit, offset } = params;
    const query: any = {};

    if (email) query.email = { $regex: email, $options: 'i' };
    if (name) query.name = { $regex: name, $options: 'i' };
    if (contactPhone) query.contactPhone = { $regex: contactPhone, $options: 'i' };

    return this.userModel
      .find(query)
      .skip(offset || 0)
      .limit(limit || 10)
      .exec();
  }
}