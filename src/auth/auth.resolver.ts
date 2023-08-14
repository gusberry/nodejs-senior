import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Customer } from 'lib/entities/customer.entity';
import { AuthService } from './auth.service';
import {
  RefreshTokenInput,
  SingInInput,
  SingUpInput,
  VerifyCodeInput,
} from './dto/auth.input';
import { Public } from './decorators/public.decorator';
import { Unverified } from './decorators/verified.decorator';
import { RefreshEntity, SignInEntity } from 'src/lib/entities/signIn.entity';

@Resolver(() => Customer)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Unverified()
  @Mutation(() => SignInEntity)
  async signIn(@Args('data') { email, password }: SingInInput) {
    return this.authService.signIn({ email, password });
  }

  @Public()
  @Unverified()
  @Mutation(() => Customer)
  async signUp(@Args('data') { email, password }: SingUpInput) {
    return this.authService.signUp({ email, password });
  }

  @Unverified()
  @Mutation(() => Customer)
  async verify(
    @Args('data') { code }: VerifyCodeInput,
    @Context('request') req: any,
  ) {
    return this.authService.verifyCode(req.user.email, code);
  }

  @Mutation(() => RefreshEntity)
  async refresh(
    @Args('data') { refresh_token }: RefreshTokenInput,
    @Context('request') req: any,
  ) {
    return this.authService.refreshToken(req.user.email, refresh_token);
  }
}
