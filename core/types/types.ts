export interface HomePageProps {
  coinData: CoinTypes;
  projectData: ProjectTypes;
}

export interface CoinTypes {
  coin_id: number;
  highest_apy: number;
  name: string;
  abbreviature: string;
  image: string;
  last_updated: string;
  price: number;
  market_cup: number;
  click: number;
}

export interface ProjectTypes {
  id: number;
  name: string;
  symbol: string;
  totalValue: number;
  stakingLink: string;
  totalApy: number;
  lastUpdated: number;
}

export interface CoinMarkets {
  apy: number;
  last_updated: string;
  status: boolean;
  locked: boolean;
  open_contribution: boolean;
  market: {
    link: string;
    logo: string;
    market_id: string;
    platform: string;
    click: number;
  },
  coin : CoinTypes,
}

export interface Review {
  id: number,
  market: string,
  time_left: string,
  apy: number,
  link: string,
  coin: string
}

export interface MarketTypes {
  market_id: string,
  highest_apy: number;
  last_update: string,
  click: number,
  link: string,
  logo: string,
  platform: string,
  earn_coins: number
}