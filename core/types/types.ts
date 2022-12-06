export interface HomePageProps {
  coinData: CoinTypes;
  projectData: ProjectTypes;
}

export interface CoinTypes {
  cg_coin_id: number;
  name: string;
  abbreviature: string;
  image: string;
  last_updated: string;
  price: number;
  market_cup: number;
  apy: number;
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
