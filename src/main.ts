import { NestFactory } from '@nestjs/core';
import { PriceModule } from './price.module';

async function bootstrap() {
  const app = await NestFactory.create(PriceModule);
  await app.listen(3000);
}
bootstrap();
