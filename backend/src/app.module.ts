import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { PizzasProvidersModule } from './pizzas-providers/pizzas-providers.module';
import { CommandLineModule } from './comand-line/command-line.module';

@Module({
  modules: [PizzasProvidersModule, CommandLineModule],
  controllers: [AppController],
})
export class ApplicationModule {}
