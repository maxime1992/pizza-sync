import { Module } from '@nestjs/common';

import { UsersService } from './users.component';

@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
