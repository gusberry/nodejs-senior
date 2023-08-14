import { Field, HideField, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CustomEmailScalar } from 'src/lib/scalars/email.scalar';

@InputType()
export class WhereCustomerInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => CustomEmailScalar, { nullable: true })
  email?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}

@InputType()
export class WhereSingleCustomerInput {
  @Field(() => String, { nullable: true })
  id?: string;
  @Field(() => CustomEmailScalar, { nullable: true })
  email?: string;
}

@InputType()
export class UpdateCustomerInput {
  @Field(() => CustomEmailScalar)
  email?: string;

  @HideField()
  @Field(() => String, { nullable: true })
  refreshToken?: string;

  @HideField()
  @Field(() => Boolean, { nullable: true })
  isVerified?: boolean;
}

@InputType()
export class GetSingleCustomerInput {
  @Field(() => WhereSingleCustomerInput)
  where: WhereSingleCustomerInput;
}

@InputType()
export class DeleteSingleCustomerInput {
  @Field(() => WhereSingleCustomerInput)
  where: WhereSingleCustomerInput;
}

@InputType()
export class UpdateSingleCustomerInput {
  @Field(() => WhereSingleCustomerInput)
  where: WhereSingleCustomerInput;
  @Field(() => UpdateCustomerInput)
  data: UpdateCustomerInput;
}

@InputType()
export class GetCustomerInput {
  @Field(() => String, { nullable: true })
  cursor?: Prisma.CustomerWhereUniqueInput;

  @Field(() => Int, { nullable: true })
  skip: number;

  @Field(() => Int, { nullable: true })
  take: number;

  @Field(() => WhereCustomerInput, { nullable: true })
  where: WhereCustomerInput;
}

@InputType()
export class CreateCustomerInput {
  @Field(() => CustomEmailScalar)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  verificationCode: string;
}
