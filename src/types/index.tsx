/**
 * This file is used to define the type of the data that will be returned by the API
 */

/**
 * Highest level of the data structure.
 */
export type PodType = {
  name: string;
  description: string;
  cover: AssetType;
  owner: OwnerType;
  tokens: TokenType[];
  stats: StatsType;
};

/**
 * TokenType
 */
export type TokenType = {
  collection: CollectionType;
  asset: AssetType;
  transaction: TransactionType;
  owner: OwnerType;
};

export type CollectionType = {
  name: string;
};
export type AssetType = {
  id: number;
  url: string;
};
export type TransactionType = {
  date: string;
  currency: string;
  amount: number;
};
export type OwnerType = {
  twitter: string | null;
  yat: string;
};

/**
 * StatsType
 */
export type StatsType = {
  tokens: string | number;
  owners: string | number;
  volume: VolumeType;
  floorPrice: { current: string | number };
};

/**
 * StatsType subtypes
 */
export type VolumeType = {
  daily: string | number;
  weekly: string | number;
  monthly: string | number;
};

export type FloorPriceType = {
  current: string | number;
};
