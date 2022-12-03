import { ICryptoType, IFiatType } from '../types';

export const STANDARD_URL = "https://api.ivorypay.io/v1/transactions";
export const STANDARD_CHECKOUT_URL = "https://checkout.ivorypay.io/payment";

export const cryptoCurrencies: ICryptoType[] = ["USDC", "USDT", "SOL"];
export const baseFiat: IFiatType[] = ["NGN", "KES", "ZAR", "GHS"];
