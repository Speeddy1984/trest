// src/hotels/hotels.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Hotel, HotelSchema } from './schemas/hotel.schema';
import { HotelRoom, HotelRoomSchema } from './schemas/hotel-room.schema';
import { HotelsService } from './hotels.service';
import { HotelsAdminController } from './hotels.admin.controller';
import { HotelRoomsAdminController } from './hotel-rooms.admin.controller';
import { HotelsCommonController } from './hotels.common.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hotel.name, schema: HotelSchema }]),
    MongooseModule.forFeature([{ name: HotelRoom.name, schema: HotelRoomSchema }]),
    // Настраиваем Multer: файлы будут сохраняться в папке src/uploads,
    // а имя файла будет сгенерировано с уникальным суффиксом и оригинальным расширением.
    MulterModule.register({
      storage: diskStorage({
        destination: './src/uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  ],
  providers: [HotelsService],
  exports: [HotelsService],
  controllers: [HotelsAdminController, HotelRoomsAdminController, HotelsCommonController],
})
export class HotelsModule {}
