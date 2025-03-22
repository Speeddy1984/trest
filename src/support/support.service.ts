import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SupportRequest, SupportRequestDocument } from './schemas/support-request.schema';
import { Message, MessageDocument } from './schemas/message.schema';
import { Model, Types } from 'mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GetChatListParams } from './interfaces/support-request.interface';
import { SupportGateway } from './support.gateway';

@Injectable()
export class SupportService {
  constructor(
    @InjectModel(SupportRequest.name) private supportRequestModel: Model<SupportRequestDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    private eventEmitter: EventEmitter2,
    private readonly supportGateway: SupportGateway, // инъекция шлюза
  ) {}

  // Клиентский сервис
  async createSupportRequest(data: { user: string; text: string }): Promise<SupportRequestDocument> {
    const newRequest = new this.supportRequestModel({
      user: new Types.ObjectId(data.user),
      messages: [{
        author: new Types.ObjectId(data.user),
        text: data.text,
      }],
      isActive: true,
    });
    return newRequest.save();
  }

  async markMessagesAsReadClient(params: { user: string; supportRequest: string; createdBefore: Date }): Promise<void> {
    // Обновляем все сообщения, которые были отправлены не этим пользователем и не прочитаны
    await this.supportRequestModel.updateOne(
      { _id: new Types.ObjectId(params.supportRequest) },
      {
        $set: {
          'messages.$[elem].readAt': new Date(),
        },
      },
      {
        arrayFilters: [{ 'elem.author': { $ne: new Types.ObjectId(params.user) }, 'elem.sentAt': { $lte: params.createdBefore } }],
      },
    );
  }

  async getUnreadCountClient(supportRequest: string, user: string): Promise<number> {
    const request = await this.supportRequestModel.findById(supportRequest);
    if (!request) {
      throw new NotFoundException('Support request not found');
    }
    // Считаем сообщения, отправленные не этим пользователем и без readAt
    return request.messages.filter(
      msg => msg.author.toString() !== user && !msg.readAt,
    ).length;
  }

  // Сервис для сотрудников (менеджеров)
  async markMessagesAsReadEmployee(params: { user: string; supportRequest: string; createdBefore: Date }): Promise<void> {
    // Обновляем сообщения, отправленные пользователем (клиентом), которые не прочитаны
    await this.supportRequestModel.updateOne(
      { _id: new Types.ObjectId(params.supportRequest) },
      {
        $set: {
          'messages.$[elem].readAt': new Date(),
        },
      },
      {
        arrayFilters: [{ 'elem.author': { $eq: new Types.ObjectId(params.user) }, 'elem.sentAt': { $lte: params.createdBefore } }],
      },
    );
  }

  async getUnreadCountEmployee(supportRequest: string, user: string): Promise<number> {
    const request = await this.supportRequestModel.findById(supportRequest);
    if (!request) {
      throw new NotFoundException('Support request not found');
    }
    // Считаем сообщения, отправленные этим пользователем (клиентом) без readAt
    return request.messages.filter(
      msg => msg.author.toString() === user && !msg.readAt,
    ).length;
  }

  async closeRequest(supportRequest: string): Promise<void> {
    await this.supportRequestModel.findByIdAndUpdate(supportRequest, { isActive: false });
  }

  async getSupportRequests(filter: { user?: string; isActive?: boolean; limit?: number; offset?: number }): Promise<SupportRequestDocument[]> {
    const query: any = {};
    if (filter.user) {
      query.user = new Types.ObjectId(filter.user);
    }
    if (typeof filter.isActive === 'boolean') {
      query.isActive = filter.isActive;
    }
    const results = await this.supportRequestModel
      .find(query)
      .limit(filter.limit ?? 10)
      .skip(filter.offset ?? 0)
      .exec();
    console.log('Found supportRequests length:', results.length);
    return results;
  }

  async getMessages(supportRequest: string): Promise<Message[]> {
    const request = await this.supportRequestModel.findById(supportRequest);
    if (!request) {
      throw new NotFoundException('Support request not found');
    }
    return request.messages;
  }

  async sendMessage(data: { author: string; supportRequest: string; text: string }): Promise<Message> {
    const request = await this.supportRequestModel.findById(data.supportRequest);
    if (!request) {
      throw new NotFoundException('Support request not found');
    }
    const newMessage = {
      author: new Types.ObjectId(data.author),
      text: data.text,
      sentAt: new Date(),
    };
    request.messages.push(newMessage as any);
    await request.save();
    // Трансляция нового сообщения через WebSocket
    this.supportGateway.broadcastNewMessage(data.supportRequest, newMessage);
    return newMessage as any;
  }


  subscribe(handler: (supportRequest: SupportRequest, message: Message) => void): () => void {
    this.eventEmitter.on('support.message', handler);
    return () => this.eventEmitter.off('support.message', handler);
  }
}
