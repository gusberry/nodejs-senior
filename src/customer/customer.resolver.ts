import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Customer } from 'lib/entities/customer.entity';
import { CustomerService } from './customer.service';
import {
  GetCustomerInput,
  GetSingleCustomerInput,
  UpdateSingleCustomerInput,
} from './dto/customer.input';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from '@prisma/client';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query(() => [Customer])
  async customers(
    @Args('data') { skip, take, where, cursor }: GetCustomerInput,
  ) {
    return this.customerService.findAll({ skip, take, where, cursor });
  }

  @Query(() => Customer)
  async customer(@Args('data') { where }: GetSingleCustomerInput) {
    return this.customerService.findOne({ where });
  }

  @Roles(Role.ADMIN)
  @Mutation(() => Customer)
  async deleteCustomer(@Args('data') { where }: GetSingleCustomerInput) {
    return this.customerService.deleteOne({ where });
  }

  @Roles(Role.ADMIN)
  @Mutation(() => Customer)
  async updateCustomer(
    @Args('data') { where, data }: UpdateSingleCustomerInput,
  ) {
    return this.customerService.updateOne({ where, data });
  }
}
