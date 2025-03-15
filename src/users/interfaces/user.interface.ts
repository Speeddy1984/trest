import { Document } from 'mongoose';

export interface User extends Document {
  email: string;
  passwordHash: string;
  name: string;
  contactPhone?: string;
  role: string;
}

declare global {
  namespace Express {
    interface User {
      _id: string;
      email: string;
      name: string;
      contactPhone?: string;
      role: string;
    }
  }
}

export interface SearchUserParams {
  limit: number;
  offset: number;
  email: string;
  name: string;
  contactPhone: string;
}

export interface IUserService {
  create(data: Partial<User>): Promise<User>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findAll(params: SearchUserParams): Promise<User[]>;
}