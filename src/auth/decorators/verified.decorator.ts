import { SetMetadata } from '@nestjs/common';

export const IS_ALLOWED_UNVERIFIED = 'Unverified';
export const Unverified = () => SetMetadata(IS_ALLOWED_UNVERIFIED, true);
