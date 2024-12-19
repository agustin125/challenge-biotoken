import { newAbi } from '../ABI/erc20';
import { ConfigService } from '@nestjs/config';
import Web3 from 'web3';

export const getTokenDecimals = async (address: string): Promise<number> => {
  const configService = new ConfigService();
  const web3 = new Web3(configService.get<string>('RPC'));

  const tokenContract = await new web3.eth.Contract(newAbi, address);
  const decimals = await tokenContract.methods.decimals().call();
  return Number(decimals);
};
