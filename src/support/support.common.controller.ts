import { Body, Controller, Get, Param, Post, UseGuards, Req } from '@nestjs/common';
import { SupportService } from './support.service';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { SetMetadata } from '@nestjs/common';
import { Request } from 'express';
import { SendMessageDto } from './dto/send-message.dto';
import { MarkMessagesAsReadDto } from './dto/mark-messages-as-read.dto';

@Controller('api/common/support-requests')
@UseGuards(AuthenticatedGuard)
export class SupportCommonController {
  constructor(private readonly supportService: SupportService) {}

  // Получение истории сообщений из обращения
  @Get(':id/messages')
  async getMessages(@Param('id') supportRequest: string) {
    const messages = await this.supportService.getMessages(supportRequest);
    return messages.map(msg => ({
      id: (msg as any)._id,
      createdAt: (msg as any).sentAt, // или (msg as any).createdAt, если timestamps созданы
      text: msg.text,
      readAt: msg.readAt,
      author: {
        id: msg.author, // если не популяровано, просто id
        name: '',       // Если нужно, можно добавить популяцию автора
      },
    }));
  }

  // Отправка сообщения
  @Post(':id/messages')
  async sendMessage(
    @Param('id') supportRequest: string,
    @Body() sendMessageDto: SendMessageDto,
    @Req() req: Request,
  ) {
    // Можно взять автора из сессии, если требуется:
    const authorId = sendMessageDto.author || req.user!['_id'];
    const message = await this.supportService.sendMessage({
      author: authorId,
      supportRequest,
      text: sendMessageDto.text,
    });
    return {
      id: (message as any)._id,
      createdAt: (message as any).sentAt,
      text: message.text,
      readAt: message.readAt,
      author: {
        id: message.author,
        name: '', // можно заполнить, если популяция автора реализована
      },
    };
  }

  // Отправка события, что сообщения прочитаны
  @Post(':id/messages/read')
  async markMessagesAsRead(
    @Param('id') supportRequest: string,
    @Body() markDto: MarkMessagesAsReadDto,
    @Req() req: Request,
  ) {
    // Для простоты, здесь вызываем клиентский метод
    await this.supportService.markMessagesAsReadClient({
      user: markDto.user,
      supportRequest,
      createdBefore: new Date(markDto.createdBefore),
    });
    return { success: true };
  }
}
