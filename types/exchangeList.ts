export interface exchangeList {
  id: number;
  name: string;
  image: string;
  stakingLink: string;
  totalValue: number;
  totalApy: number;
  lastUpdated: number;
}

export interface OneCoinTypes {
  id: number;
  name: string;
  nameShort: string;
  price: number;
  marketCap: number;
}