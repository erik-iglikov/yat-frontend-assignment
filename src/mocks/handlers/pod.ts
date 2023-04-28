import { rest } from 'msw';
import { PodType, TokenType } from 'types/index';
import { randomAsset, randomOwner } from './randomizingUtils';
import { generateTokens } from './generateTokens';
import { filterSortAndPaginateTokens } from './filterSortAndPaginateTokens';

// Generate a fixed set of tokens (you can adjust the number as needed)
const tokens: TokenType[] = generateTokens(100);

export const getPod = rest.get('http://mock-server/collection/pod', (req, res, ctx) => {

  const pod: PodType = {
    name: 'Test Pod',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras commodo magna mauris, sed vulputate odio blandit at. Donec eleifend lectus.',
    cover: randomAsset(),
    owner: randomOwner(),
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

export const getTokens = rest.get("http://mock-server/collection/tokens", (req, res, ctx) => {
  // Parse request parameters
  const params = new URLSearchParams(req.url.search);
  const searchTerm = params.get("search_term") || "";
  const sortField = params.get("sort_field") || "date";
  const sortOrder = params.get("sort_order") || "asc";
  const ownerFilter = params.get("owner") || "";
  const page = parseInt(params.get("page") || "1", 10);
  const pageSize = parseInt(params.get("page_size") || "12", 10); // 12 tokens is 3 rows on desktop

  // Filter, sort, and paginate tokens
  const result = filterSortAndPaginateTokens(
    tokens,
    searchTerm,
    sortField,
    sortOrder,
    ownerFilter,
    page,
    pageSize
  );

  return res(ctx.status(200), ctx.json(result));
});
