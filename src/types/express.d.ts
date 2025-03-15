import { User } from '../../users/schemas/user.schema';

declare global {
  namespace Express {
    interface User {
      _id: string;
      email: string;
      role: UserRole;
      name: string;
      contactPhone?: string;
    }
  }
}