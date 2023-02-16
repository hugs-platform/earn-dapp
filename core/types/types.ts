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
  time_left: string,
  apy: number,
  link: string,
  answer: boolean;
  coin: {
    abbreviature: string;
    click: number;
    coin_id: string;
    market_cup: number;
    name: string;
    price: number;
    last_updated: string;
  },
  market: {
    click: number;
    earn_coins: number;
    highest_apy: number;
    last_updated: string;
    link: string;
    market_id: string;
    platform: string;
  };
  contribution : {
    contribution_type: number
  }
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

export interface ReviewRequest {
  id: string;
  updated_at: string,
  created_at: string,
  expired: boolean;
  answer: boolean;
  coin: {
    abbreviature: string;
    click: number;
    coin_id: string;
    market_cup: number;
    name: string;
    price: number;
    last_updated: string;
  },
  market: {
    click: number;
    earn_coins: number;
    highest_apy: number;
    last_updated: string;
    link: string;
    market_id: string;
    platform: string;
  };
  remarks: string;
  time_left: string;
  contribution: {
    id: string;
    apy: number;
    uuid: string;
    child_uuid: string;
    contribution_type: number;
    contributor: {
      id: string;
    },
    created_at: string;
    updated_at: string;
    iteration: number;
    market_coin: {
      id: string;
    },
    expired: boolean
  };
}

export interface CoinContribution {
  id: string;
  apy: number;
  locked: boolean;
  status: boolean;
  created_at: string;
  updated_at: string;
  coin: {
    abbreviature: string;
    click: number;
    coin_id: string;
    market_cup: number;
    name: string;
    price: number;
    last_updated: string;
  },
  market: {
    click: number;
    earn_coins: number;
    highest_apy: number;
    last_updated: string;
    link: string;
    market_id: string;
    platform: string;
  };
}