import { Injectable } from '@nestjs/common';
import { getPolTokenPrice } from './util/coingeko.util';
import { getTokenDecimals } from './util/token.util';
import { ITokenResponse } from './interfaces/token.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PriceService {
  constructor(private readonly configService: ConfigService) {}

  async getTokenPrice(): Promise<ITokenResponse> {
    const polAddress = this.configService.get<string>('POL_ADDRESS');

    const polPrice = await getPolTokenPrice();
    const polDecimals = await getTokenDecimals(polAddress);

    const ITokenResponse: ITokenResponse = {
      token: 'POL',
      priceUSD: polPrice,
      decimals: polDecimals,
      source: 'CoinGecko',
    };

    return ITokenResponse;
  }
}
