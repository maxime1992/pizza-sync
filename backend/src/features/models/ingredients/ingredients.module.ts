import { Module } from '@nestjs/common';

import { IngredientsService } from './ingredients.component';

@Module({
  components: [IngredientsService],
  exports: [IngredientsService],
})
export class IngredientsModule {}
