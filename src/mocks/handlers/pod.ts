import { rest } from 'msw';
import { PodType, TokenType, OwnerType, AssetType, CollectionType, TransactionType, StatsType, VolumeType, FloorPriceType } from 'types/index';
import { randomNumber, randomPick, randomIsoDate, randomOwner, randomAsset, randomCollection } from './randomizingUtils';
import { generateTokens } from './generateTokens';

// Generate a fixed set of tokens (you can adjust the number as needed)
const tokens: TokenType[] = generateTokens(100);

export const getPod = rest.get('http://mock-server/collection/pod', (req, res, ctx) => {

  const pod: PodType = {
    name: 'Test Pod',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras commodo magna mauris, sed vulputate odio blandit at. Donec eleifend lectus.',
    cover: randomAsset(),
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
    tokens: tokens,
  };

  return res(ctx.status(200), ctx.json(pod))
})

export const getTokens = rest.get('http://mock-server/collection/tokens', (req, res, ctx) => {
  // Parse request parameters
  const params = new URLSearchParams(req.url.search);
  const searchTerm = params.get('search_term') || '';
  const sortField = params.get('sort_field') || 'date';
  const sortOrder = params.get('sort_order') || 'asc';
  const page = parseInt(params.get('page') || '1', 12);
  const pageSize = parseInt(params.get('page_size') || '12', 12); // 12 tokens is 3 rows on desktop

  // Filter, sort, and paginate tokens
  const filteredTokens = filterSortAndPaginateTokens(tokens, searchTerm, sortField, sortOrder, page, pageSize);



  console.log('filteredTokens', filteredTokens)

  return res(
    ctx.status(200),
    ctx.json(filteredTokens)
  );
});



function filterSortAndPaginateTokens(tokens: TokenType[], searchTerm: string, sortField: string, sortOrder: string, page: number, pageSize: number) {

  // Apply filters
  let filteredTokens = tokens.filter((token) => {
    return (
      (!searchTerm || token.collection.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

   // Apply sorting
  filteredTokens.sort((a: TokenType, b: TokenType) => {
    const valueA = (a.transaction as { [key: string]: any })[sortField];
    const valueB = (b.transaction as { [key: string]: any })[sortField];

    if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Apply pagination
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedTokens = filteredTokens.slice(startIndex, endIndex);

  return paginatedTokens;
}
