import { Document, Types } from 'mongoose';

// Интерфейс для модели SupportRequest
export interface SupportRequest extends Document {
  user: Types.ObjectId;
  createdAt: Date;
  messages: Types.ObjectId[];
  isActive: boolean;
}

// Интерфейс для модели Message
export interface Message extends Document {
  author: Types.ObjectId;
  supportRequest: Types.ObjectId; // Добавляем supportRequest
  sentAt: Date;
  text: string;
  readAt?: Date;
}

// Интерфейс для создания запроса в поддержку
export interface CreateSupportRequestDto {
  user: string;
  text: string;
}

// Интерфейс для отправки сообщения
export interface SendMessageDto {
  author: string;
  supportRequest: string;
  text: string;
}

// Интерфейс для отметки сообщений как прочитанных
export interface MarkMessagesAsReadDto {
  user: string;
  supportRequest: string;
  createdBefore: Date;
}

// Интерфейс для поиска запросов в поддержку
export interface GetChatListParams {
  user: string | null;
  isActive: boolean;
}

// Интерфейс для сервиса SupportRequest
export interface ISupportRequestService {
  findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]>;
  sendMessage(data: SendMessageDto): Promise<Message>;
  getMessages(supportRequest: string): Promise<Message[]>;
  subscribe(
    handler: (supportRequest: SupportRequest, message: Message) => void,
  ): () => void;
}

// Интерфейс для сервиса SupportRequestClient
export interface ISupportRequestClientService {
  createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest>;
  markMessagesAsRead(params: MarkMessagesAsReadDto): Promise<void>;
  getUnreadCount(supportRequest: string): Promise<number>;
}

// Интерфейс для сервиса SupportRequestEmployee
export interface ISupportRequestEmployeeService {
  markMessagesAsRead(params: MarkMessagesAsReadDto): Promise<void>;
  getUnreadCount(supportRequest: string): Promise<number>;
  closeRequest(supportRequest: string): Promise<void>;
}