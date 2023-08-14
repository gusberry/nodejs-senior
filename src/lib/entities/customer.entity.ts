import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Base } from 'lib/entities/base.entity';
import { CustomEmailScalar } from '../scalars/email.scalar';
import { Role } from '@prisma/client';

registerEnumType(Role, {
  name: 'Role',
});

@ObjectType()
export class Customer extends Base {
  @Field(() => CustomEmailScalar)
  email: string;

  @Field(() => Role)
  role: Role;
}
