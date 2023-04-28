import { rest } from 'msw';
import { PodType, TokenType } from 'types/PodProps';
import { generatePod, randomAsset, randomOwner, randomTokens } from './randomizingUtils';
import { filterSortAndPaginateTokens } from './filterSortAndPaginateTokens';
import { POD_API_URL, TOKENS_API_URL } from 'constants/apiUrls';

// Generate a fixed set of tokens (you can adjust the number as needed)
const tokens: TokenType[] = randomTokens(100);

/**
 * Mock API handler for getting pod data.
 * Responds with a generated PodType object containing a fixed set of tokens.
 */
export const getPod = rest.get(POD_API_URL, (req, res, ctx) => {
  try {
    const pod: PodType = generatePod(tokens);

    return res(ctx.status(200), ctx.json(pod));
  } catch (error) {
    console.error('Error fetching pod data:', error);
    return res(ctx.status(500), ctx.json({ message: 'Internal server error' }));
  }
});

/**
 * Mock API handler for getting tokens data.
 * Filters, sorts, and paginates tokens based on request parameters.
 * Responds with the corresponding filtered and paginated tokens.
 */
export const getTokens = rest.get(TOKENS_API_URL, (req, res, ctx) => {
  try {
    // Parse request parameters
    const params = new URLSearchParams(req.url.search);
    const searchTerm = params.get('search_term') || '';
    const sortField = params.get('sort_field') || 'date';
    const sortOrder = params.get('sort_order') || 'asc';
    const ownerFilter = params.get('owner') || '';
    const page = parseInt(params.get('page') || '1', 10);
    const pageSize = parseInt(params.get('page_size') || '12', 10); // 12 tokens is 3 rows on desktop

    // Filter, sort, and paginate tokens
    const filteredTokens = filterSortAndPaginateTokens(
      tokens,
      searchTerm,
      sortField,
      sortOrder,
      ownerFilter,
      page,
      pageSize,
    );

    return res(ctx.status(200), ctx.json(filteredTokens));
  } catch (error) {
    console.error('Error fetching pod data:', error);
    return res(ctx.status(500), ctx.json({ message: 'Internal server error' }));
  }
});
