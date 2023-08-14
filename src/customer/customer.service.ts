import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  CreateCustomerInput,
  DeleteSingleCustomerInput,
  GetCustomerInput,
  GetSingleCustomerInput,
  UpdateSingleCustomerInput,
} from './dto/customer.input';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: GetCustomerInput) {
    const { skip, take, cursor, where } = params;

    return this.prisma.customer.findMany({
      skip,
      take,
      cursor,
      where,
    });
  }

  async create(params: CreateCustomerInput) {
    const { email, password, verificationCode } = params;

    return this.prisma.customer.create({
      data: { email, password, verificationCode },
    });
  }

  async findOne(params: GetSingleCustomerInput) {
    return this.prisma.customer.findFirst({ where: params.where });
  }

  async deleteOne(params: DeleteSingleCustomerInput) {
    return this.prisma.customer.delete({ where: params.where });
  }

  async updateOne(params: UpdateSingleCustomerInput) {
    const { where, data } = params;

    return this.prisma.customer.update({
      where,
      data,
    });
  }
}
