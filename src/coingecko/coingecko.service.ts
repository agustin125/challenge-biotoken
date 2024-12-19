import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class CoingeckoService {
  private readonly coingeckoUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.coingeckoUrl = this.configService.get<string>('COINGECKO_URL');
    if (!this.coingeckoUrl) {
      throw new Error('COINGECKO_URL environment variable is not set.');
    }
  }

  /**
   * Fetch the price of the POL token in USD.
   * @returns {Promise<number>} The price of the token.
   */
  async getPolTokenPrice(): Promise<number> {
    try {
      const response = await axios.get(
        `${this.coingeckoUrl}?ids=matic-network&vs_currencies=usd`,
      );

      if (response.status !== 200 || !response.data['matic-network']?.usd) {
        throw new Error('Invalid response from CoinGecko');
      }

      return Number(response.data['matic-network'].usd);
    } catch (error) {
      throw new Error('Invalid response from CoinGecko');
    }
  }
}
