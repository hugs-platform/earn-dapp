// gaat gebruikt worden in getServersideProps
export interface OneCoinResults {
  results: OneCoinTypes[];
}

export interface OneCoinTypes {
  id: number;
  name: string;
  nameShort: string;
  price: number;
  marketCap: number;
}
