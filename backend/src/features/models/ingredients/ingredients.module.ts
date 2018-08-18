import { Module } from '@nestjs/common';

import { IngredientsService } from './ingredients.component';

@Module({
  providers: [IngredientsService],
  exports: [IngredientsService],
})
export class IngredientsModule {}
