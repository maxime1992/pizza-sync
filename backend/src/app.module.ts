import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

@Module({
  modules: [],
  controllers: [AppController],
})
export class ApplicationModule {}
