import { Module } from '@nestjs/common';

import { UsersService } from './users.component';

@Module({
  components: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
