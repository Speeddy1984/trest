import { Controller, Get, Query, UseGuards, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { SupportService } from './support.service';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { SetMetadata } from '@nestjs/common';

@Controller('api/manager/support-requests')
@UseGuards(AuthenticatedGuard)
@SetMetadata('roles', ['manager'])
export class SupportManagerController {
  constructor(private readonly supportService: SupportService) {}

  // Получение списка обращений от клиентов
  @Get()
  async getSupportRequests(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('isActive') isActive: string,
  ) {
    const filter: any = {};
    // Если isActive передан, добавляем в фильтр
    if (isActive !== undefined) {
      filter.isActive = isActive === 'true';
    }
    // Для менеджера не фильтруем по user, поэтому не передаем свойство user
    const supportRequests = await this.supportService.getSupportRequests({
      // user: undefined, // можно и так, но лучше не указывать
      isActive: filter.isActive,
      limit,
      offset,
    });
    return supportRequests.map(req => ({
      id: (req as any)._id,
      createdAt: (req as any).createdAt,
      isActive: req.isActive,
      hasNewMessages: req.messages.some(msg => !msg.readAt),
      client: {
        id: (req as any).user, // здесь можно популяцию пользователя добавить, если требуется
        name: '', // заполните при необходимости
        email: '',
        contactPhone: '',
      },
    }));
  }
}
