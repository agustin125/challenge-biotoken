import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { newAbi } from '../ABI/erc20';

@Injectable()
export class TokenService {
  private readonly web3: Web3;

  constructor(private readonly configService: ConfigService) {
    const rpcUrl = this.configService.get<string>('RPC');
    if (!rpcUrl) {
      throw new Error('RPC environment variable is not set.');
    }
    this.web3 = new Web3(rpcUrl);
  }

  async getTokenDecimals(address: string): Promise<number> {
    try {
      const tokenContract = new this.web3.eth.Contract(
        newAbi as AbiItem[],
        address,
      );
      const decimals = await tokenContract.methods.decimals().call();
      return Number(decimals);
    } catch (error) {
      console.error(
        `Error fetching decimals for address ${address}: ${error.message}`,
      );
      throw new Error(
        'Failed to fetch token decimals. Verify the contract address and RPC node.',
      );
    }
  }
}
