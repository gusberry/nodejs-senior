import { Field, ObjectType } from '@nestjs/graphql';
import { Base } from 'lib/entities/base.entity';
import { CustomEmailScalar } from '../scalars/email.scalar';
import { Role } from '@prisma/client';

@ObjectType()
export class SignInUserEntity extends Base {
  @Field(() => String)
  id: string;

  @Field(() => CustomEmailScalar)
  email: string;
}

@ObjectType()
export class SignInEntity extends Base {
  @Field(() => String)
  access_token: string;
  @Field(() => String)
  refresh_token: Role;

  @Field(() => SignInUserEntity)
  user: SignInUserEntity;
}

@ObjectType()
export class RefreshEntity extends Base {
  @Field(() => String)
  access_token: string;
  @Field(() => String)
  refresh_token: Role;

  @Field(() => SignInUserEntity)
  user: SignInUserEntity;
}
