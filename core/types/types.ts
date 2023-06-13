export interface HomePageProps {
  coinData: CoinTypes;
  projectData: ProjectTypes;
}

export interface CoinTypes {
  coin_id: number;
  max_apy: number;
  min_apy: number;
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
  id: string;
  min_apy: number;
  max_apy: number;
  days: number;
  staking_type: string;
  last_updated: string;
  status: boolean;
  market: {
    redirect_link: string;
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
  min_apy: number;
  max_apy: number;
  days: number;
  staking_type: string;
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
  id: string,
  market_id: string,
  min_apy: number;
  max_apy: number;
  last_update: string,
  click: number,
  link: string,
  redirect_link: string,
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
    min_apy: number;
    max_apy: number;
    days: number;
    staking_type: string;
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
  min_apy: number;
  max_apy: number;
  days: number;
  staking_type: string;
  status: string;
  created_at: string;
  updated_at: string;
  contribution_type: string;
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

export interface ProfileTypes {
  id: string;
  email: string;
  is_admin: boolean;
  is_active: boolean;
  role: string;
  application_id: string;
  user: {
    wallet: string;
  }
}