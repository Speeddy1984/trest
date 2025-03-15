import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SupportRequest, Message } from './interfaces/support.interface';
import { CreateSupportRequestDto } from './dto/create-support-request.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { MarkMessagesAsReadDto } from './dto/mark-messages-read.dto';
import { ISupportRequestService } from './interfaces/support.interface';
import { GetChatListParams } from './interfaces/support.interface';

@Injectable()
export class SupportService implements ISupportRequestService {
  constructor(
    @InjectModel('SupportRequest')
    private supportRequestModel: Model<SupportRequest>,
    @InjectModel('Message')
    private messageModel: Model<Message>,
    private eventEmitter: EventEmitter2, // Добавляем EventEmitter
  ) {}

  async createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest> {
    const message = new this.messageModel({
      author: data.user,
      text: data.text,
    });
    await message.save();

    const supportRequest = new this.supportRequestModel({
      user: data.user,
      messages: [message._id],
    });
    const savedRequest = await supportRequest.save();

    // Уведомляем о новом запросе поддержки
    this.eventEmitter.emit('supportRequest.created', savedRequest);

    return savedRequest;
  }

  async sendMessage(data: SendMessageDto): Promise<Message> {
    const message = new this.messageModel({
      author: data.author,
      supportRequest: data.supportRequest, // Добавляем supportRequest
      text: data.text,
    });
    await message.save();
  
    await this.supportRequestModel.findByIdAndUpdate(
      data.supportRequest,
      { $push: { messages: message._id } },
    );
  
    this.eventEmitter.emit('message.created', message);
    return message;
  }

  async markMessagesAsRead(data: MarkMessagesAsReadDto): Promise<void> {
    await this.messageModel.updateMany(
      {
        supportRequest: data.supportRequest, // Используем supportRequest
        author: { $ne: data.user },
        readAt: { $exists: false },
        sentAt: { $lte: data.createdBefore },
      },
      { $set: { readAt: new Date() } },
    );
  
    this.eventEmitter.emit('messages.read', data);
  }

  async findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]> {
    const query: any = {};

    if (params.user) query.user = params.user;
    if (params.isActive !== undefined) query.isActive = params.isActive;

    return this.supportRequestModel.find(query).exec();
  }

  async getMessages(supportRequest: string): Promise<Message[]> {
    const request = await this.supportRequestModel
      .findById(supportRequest)
      .populate({
        path: 'messages',
        model: 'Message', // Указываем модель для populate
      })
      .exec();
  
    if (!request) {
      throw new NotFoundException('Support request not found');
    }
  
    return request.messages as unknown as Message[]; // Приводим тип
  }
  
  async getUnreadCount(supportRequest: string): Promise<number> {
    const count = await this.messageModel
      .countDocuments({
        supportRequest,
        readAt: { $exists: false },
      })
      .exec();

    return count;
  }

  async closeRequest(supportRequest: string): Promise<void> {
    await this.supportRequestModel.findByIdAndUpdate(supportRequest, {
      isActive: false,
    });

    // Уведомляем о закрытии запроса
    this.eventEmitter.emit('supportRequest.closed', supportRequest);
  }

  // Реализация метода subscribe
  subscribe(
    handler: (supportRequest: SupportRequest, message: Message) => void,
  ): () => void {
    const listener = (message: Message) => {
      this.supportRequestModel
        .findById(message.supportRequest)
        .then((supportRequest) => {
          if (supportRequest) {
            handler(supportRequest as SupportRequest, message);
          }
        });
    };
  
    this.eventEmitter.on('message.created', listener);
  
    return () => {
      this.eventEmitter.off('message.created', listener);
    };
  }
}