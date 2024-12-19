import axios from 'axios';

export const getPolTokenPrice = async (): Promise<number> => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd',
    );

    return Number(response.data['matic-network'].usd);
  } catch (error) {
    throw {
      error: 'Unable to retrieve token price',
    };
  }
};
