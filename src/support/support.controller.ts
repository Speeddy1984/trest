import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
  } from '@nestjs/common';
  import { SupportService } from './support.service';
  import { CreateSupportRequestDto } from './dto/create-support-request.dto';
  import { SendMessageDto } from './dto/send-message.dto';
  import { MarkMessagesAsReadDto } from './dto/mark-messages-read.dto';
  
  
  @Controller('support')
  export class SupportController {
    constructor(private readonly supportService: SupportService) {}
  
    @Post('request')
    async createSupportRequest(@Body() data: CreateSupportRequestDto) {
      return this.supportService.createSupportRequest(data);
    }
  
    @Post('message')
    async sendMessage(@Body() data: SendMessageDto) {
      return this.supportService.sendMessage(data);
    }
  
    @Post('mark-as-read')
    async markMessagesAsRead(@Body() data: MarkMessagesAsReadDto) {
      return this.supportService.markMessagesAsRead(data);
    }
  
    @Get('requests')
    async getSupportRequests(@Query('user') userId: string, @Query('isActive') isActive: boolean) {
      return this.supportService.findSupportRequests({ user: userId, isActive });
    }
  
    @Get('messages/:requestId')
    async getMessages(@Param('requestId') requestId: string) {
      return this.supportService.getMessages(requestId);
    }
  }