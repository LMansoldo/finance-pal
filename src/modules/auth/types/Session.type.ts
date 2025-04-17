import { User } from '@modules/auth/types/User.type';

export interface Session {
  user: User;
  token: string;
  expiresAt: number;
}