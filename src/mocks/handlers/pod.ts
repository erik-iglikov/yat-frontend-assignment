import { rest } from 'msw';
import { PodType, TokenType, OwnerType, AssetType, CollectionType, TransactionType, StatsType, VolumeType, FloorPriceType } from 'types/index';
import { randomNumber, randomPick, randomIsoDate, randomOwner, randomAsset, randomCollection } from './randomizingUtils';
import { log } from 'console';

export const pod = rest.get('http://mock-server/collection/test', (req, res, ctx) => {
  // Parse request parameters
  const params = new URLSearchParams(req.url.search);
  const searchTerm = params.get('search_term') || '';
  const sortField = params.get('sort_field') || 'date';
  const sortOrder = params.get('sort_order') || 'asc';
  const page = parseInt(params.get('page') || '1', 10);
  const pageSize = parseInt(params.get('page_size') || '10', 10);

  // Generate tokens with filtering, sorting, and pagination
  function generateTokens(limit: number) {
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

    // Apply filters
    let filteredTokens = tokens.filter((token) => {
      return (
        (!searchTerm || token.collection.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
    
    // Apply sorting
    filteredTokens.sort((a: TokenType, b: TokenType) => {
      console.log('-----', sortField, sortOrder)
      const valueA = (a.transaction as { [key: string]: any })[sortField];
      const valueB = (b.transaction as { [key: string]: any })[sortField];

      if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    console.log('----', filteredTokens)


    // Apply pagination
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedTokens = filteredTokens.slice(startIndex, endIndex);

    return filteredTokens;
  }

  return res(
    ctx.status(200),
    ctx.json({
      pod: {
        name: 'Test Pod',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras commodo magna mauris, sed vulputate odio blandit at. Donec eleifend lectus.',
        stats: {
          tokens: 10000,
          owners: 5257,
          volume: {
            daily: 98561,
            weekly: 169234,
            monthly: 4641231,
          },
          floorPrice: {
            current: 0.515,
          },
        },
        tokens: generateTokens(100),
      },
    }),
  );
});
