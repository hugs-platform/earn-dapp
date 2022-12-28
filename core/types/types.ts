export interface HomePageProps {
  coinData: CoinTypes;
  projectData: ProjectTypes;
}

export interface CoinTypes {
  coin_id: number;
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
  market: {
    link: string;
    logo: string;
    market_id: string;
    platform: string;
    click: number;
  }
}
