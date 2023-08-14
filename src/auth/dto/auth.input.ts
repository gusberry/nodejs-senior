import { Field, InputType } from '@nestjs/graphql';
import { CustomEmailScalar } from 'src/lib/scalars/email.scalar';

@InputType()
export class SingInInput {
  @Field(() => CustomEmailScalar)
  email: string;

  @Field()
  password: string;
}

@InputType()
export class SingUpInput {
  @Field(() => CustomEmailScalar)
  email: string;

  @Field()
  password: string;
}

@InputType()
export class VerifyCodeInput {
  @Field(() => String)
  code: string;
}

@InputType()
export class RefreshTokenInput {
  @Field(() => String)
  refresh_token: string;
}
