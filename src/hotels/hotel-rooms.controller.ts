import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Query,
    Req,
    UploadedFiles,
    UseInterceptors,
    UseGuards,
  } from '@nestjs/common';
  import { HotelRoomsService } from './hotel-rooms.service';
  import { CreateHotelRoomDto } from './dto/create-hotel-room.dto';
  import { UpdateHotelRoomDto } from './dto/update-hotel-room.dto';
  import { Request } from 'express';
  import { Express } from 'express-serve-static-core';
  import { RolesGuard } from '../auth/guards/roles.guard';
  import { Roles } from '../auth/decorators/roles.decorator';
  import { UserRole } from '../users/enums/user-role.enum';
  import { FilesInterceptor } from '@nestjs/platform-express';
  
  @Controller('api/common/hotel-rooms')
  export class HotelRoomsController {
    constructor(private readonly hotelRoomsService: HotelRoomsService) {}
  
    @Get()
    async search(
      @Query('limit') limit: number,
      @Query('offset') offset: number,
      @Query('hotel') hotelId: string,
      @Req() req: Request,
    ) {
      const isEnabled = req.user?.role === UserRole.Admin ? undefined : true;
      return this.hotelRoomsService.search({ limit, offset, hotel: hotelId, isEnabled });
    }
  
    @Get(':id')
    async findById(@Param('id') id: string) {
      return this.hotelRoomsService.findById(id);
    }
  
    @Post()
    @UseInterceptors(FilesInterceptor('images'))
    @UseGuards(RolesGuard)
    @Roles(UserRole.Admin)
    async createRoom(
      @Body() data: CreateHotelRoomDto,
      @UploadedFiles() images: Express.Multer.File[],
    ) {
      const imageUrls = images.map((file) => file.path); // Сохраняем пути к файлам
      return this.hotelRoomsService.create({ ...data, images: imageUrls });
    }
  
    @Put(':id')
    @UseInterceptors(FilesInterceptor('images'))
    @UseGuards(RolesGuard)
    @Roles(UserRole.Admin)
    async updateRoom(
      @Param('id') id: string,
      @Body() data: UpdateHotelRoomDto,
      @UploadedFiles() images: Express.Multer.File[],
    ) {
      const imageUrls = images.map((file) => file.path); // Сохраняем пути к файлам
      return this.hotelRoomsService.update(id, { ...data, images: imageUrls });
    }
  }