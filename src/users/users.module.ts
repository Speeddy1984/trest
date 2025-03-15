import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersAdminController } from './users.controller';
import { UsersManagerController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersAdminController, UsersManagerController],
  providers: [UsersService],
})
export class UsersModule {}