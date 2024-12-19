import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { PriceController } from './price.controller';
import { PriceService } from './price.service';
import { ConfigModule } from '@nestjs/config';
import { CoingeckoModule } from 'src/coingecko/coingecko.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CoingeckoModule,
    TokenModule,
  ],
  controllers: [PriceController],
  providers: [
    PriceService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class PriceModule {}
