export interface HomePageProps {
  coinData: CoinTypes;
  projectData: ProjectTypes;
}

export interface CoinTypes {
  coinId: number;
  name: string;
  abbreviature: string;
  image: string;
  lastUpdated: string;
  price: number;
  marketCup: number;
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
