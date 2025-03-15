import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserAdminDto } from './dto/create-user-admin.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from './enums/user-role.enum';

@Controller('api/admin/users')
@UseGuards(RolesGuard)
@Roles(UserRole.Admin)
export class UsersAdminController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() data: CreateUserAdminDto) {
    const user = await this.usersService.createAdminUser(data);
    return {
      id: user._id,
      email: user.email,
      name: user.name,
      contactPhone: user.contactPhone,
      role: user.role,
    };
  }

  @Get()
  async findAll(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('name') name: string,
    @Query('email') email: string,
    @Query('contactPhone') contactPhone: string,
  ) {
    const users = await this.usersService.findAllUsers({
      limit,
      offset,
      name,
      email,
      contactPhone,
    });

    return users.map((user) => ({
      id: user._id,
      email: user.email,
      name: user.name,
      contactPhone: user.contactPhone,
    }));
  }
}

@Controller('api/manager/users')
@UseGuards(RolesGuard)
@Roles(UserRole.Manager)
export class UsersManagerController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('name') name: string,
    @Query('email') email: string,
    @Query('contactPhone') contactPhone: string,
  ) {
    const users = await this.usersService.findAllUsers({
      limit,
      offset,
      name,
      email,
      contactPhone,
    });

    return users.map((user) => ({
      id: user._id,
      email: user.email,
      name: user.name,
      contactPhone: user.contactPhone,
    }));
  }
}