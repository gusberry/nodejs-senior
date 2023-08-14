import { Role } from '@prisma/client';

export interface JWTPayload {
  email: string;
  role: Role;
  sub: string;
  isVerified: boolean;
}
