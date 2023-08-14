import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CustomerService } from 'src/customer/customer.service';
import { SingInInput, SingUpInput } from './dto/auth.input';
import { UserInputError } from 'apollo-server-errors';
import { JWTPayload } from './dto/jwt.payload';
import { Customer } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly jwtService: JwtService,
  ) {}

  async validateAndReturnJwtPayload(
    email: string,
    password: string,
  ): Promise<JWTPayload> {
    const user = await this.customerService.findOne({ where: { email } });
    const valid = user && (await bcrypt.compare(password, user?.password));

    if (!valid) {
      throw new UserInputError('Invalid email or password');
    }

    return this.fromUserToJwtPayload(user);
  }

  async signIn(loginCustomerInput: SingInInput) {
    const payload = await this.validateAndReturnJwtPayload(
      loginCustomerInput.email,
      loginCustomerInput.password,
    );

    return this.generateTokens(payload);
  }

  async signUp(signupCustomerInput: SingUpInput) {
    const password = await bcrypt.hash(signupCustomerInput.password, 10);
    const verificationCode = await bcrypt.hash(
      Math.floor(1000 + Math.random() * 9999).toString(),
      10,
    );

    // TODO: send verification code via any channel to user in application

    return this.customerService.create({
      email: signupCustomerInput.email,
      password,
      verificationCode,
    });
  }

  async verifyCode(email: string, code: string) {
    const user = await this.customerService.findOne({ where: { email } });
    const valid = user && (await bcrypt.compare(user.verificationCode, code));

    if (!valid) {
      throw new BadRequestException('Code not valid');
    }

    return await this.customerService.updateOne({
      where: { email },
      data: { isVerified: true },
    });
  }

  async refreshToken(email: string, refresh_token: string) {
    const user = await this.customerService.findOne({ where: { email } });
    const valid =
      user && (await bcrypt.compare(user.refreshToken, refresh_token));

    if (!valid) {
      throw new BadRequestException('Refresh token not valid');
    }

    return this.generateTokens(this.fromUserToJwtPayload(user));
  }

  private getAccessToken(payload: JWTPayload, expiresIn?: string): string {
    return this.jwtService.sign(payload, expiresIn ? { expiresIn } : undefined);
  }

  private async generateTokens(payload: JWTPayload) {
    const refreshToken = this.getAccessToken(payload, '2d');

    this.customerService.updateOne({
      where: { email: payload.email },
      data: { refreshToken },
    });

    return {
      access_token: this.getAccessToken(payload),
      refresh_token: await bcrypt.hash(refreshToken, 10),
      user: {
        id: payload.sub,
        email: payload.email,
      },
    };
  }

  private fromUserToJwtPayload(user: Customer) {
    return {
      sub: user.id,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    };
  }
}
