export interface HomePageProps {
  coinData: CoinTypes;
  projectData: ProjectTypes;
}

export interface CoinTypes {
  id: number;
  name: string;
  symbol: string;
  nameAbbreviation: string;
  price: number;
  marketCap: number;
  apy: number;
  image: {
    small: string,
  };
  market_data: {
    current_price: {
      usd: number
    },
    market_cap: {
      usd: number
    },
    price_change_percentage_1y: number
  }
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
