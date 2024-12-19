import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CoingeckoService } from '../coingecko/coingecko.service';
import { TokenService } from '../token/token.service';
import { ITokenResponse } from '../interfaces/token.interface';

@Injectable()
export class PriceService {
  constructor(
    private readonly configService: ConfigService,
    private readonly coingeckoService: CoingeckoService,
    private readonly tokenService: TokenService,
  ) {}

  async getTokenPrice(): Promise<ITokenResponse> {
    const polAddress = this.configService.get<string>('POL_ADDRESS');
    if (!polAddress) {
      throw new Error('POL_ADDRESS environment variable is not set.');
    }

    const polPrice = await this.coingeckoService.getPolTokenPrice();
    const polDecimals = await this.tokenService.getTokenDecimals(polAddress);

    return {
      token: 'POL',
      priceUSD: polPrice,
      decimals: polDecimals,
      source: 'CoinGecko',
    };
  }
}
