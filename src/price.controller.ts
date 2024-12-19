import { Controller, Get } from '@nestjs/common';
import { PriceService } from './price.service';
import { ITokenResponse } from './interfaces/token.interface';

@Controller()
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Get('token-price')
  getTokenPrice(): Promise<ITokenResponse> {
    return this.priceService.getTokenPrice();
  }
}
