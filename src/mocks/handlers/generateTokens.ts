import {
  randomCollection,
  randomAsset,
  randomIsoDate,
  randomOwner,
  randomNumber,
} from './randomizingUtils';

export function generateTokens(limit: number) {
  const tokens = [];

  for (let i = 0; i < limit; i++) {
    tokens.push({
      collection: randomCollection(),
      asset: randomAsset(),
      transaction: {
        date: randomIsoDate(new Date(2023, 0, 1), new Date()),
        currency: 'eth',
        amount: randomNumber(5),
      },
      owner: randomOwner(),
    });
  }

  return tokens;
}
