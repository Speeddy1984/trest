import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';

@Controller('api/admin/hotels')
@UseGuards(RolesGuard)
@Roles(UserRole.Admin)
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post()
  async create(@Body() data: CreateHotelDto) {
    return this.hotelsService.create(data);
  }

  @Get()
  async findAll(@Query('limit') limit: number, @Query('offset') offset: number) {
    return this.hotelsService.findAll({ limit, offset });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateHotelDto) {
    return this.hotelsService.update(id, data);
  }
}