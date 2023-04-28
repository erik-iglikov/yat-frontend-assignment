import { TokenType } from 'types/PodProps';

/**
 * Filters, sorts, and paginates a list of tokens based on the provided criteria.
 *
 * @param tokens - The list of tokens to process.
 * @param searchTerm - The search term to filter tokens by.
 * @param sortField - The field to sort tokens by.
 * @param sortOrder - The order to sort tokens in ('asc' or 'desc').
 * @param ownerFilter - The owner filter to apply to tokens.
 * @param page - The current page number.
 * @param pageSize - The number of tokens per page.
 * @returns An object containing the filtered, sorted, and paginated tokens, the total number of filtered tokens, and the number of the next page if available.
 */
export const filterSortAndPaginateTokens = (
  tokens: TokenType[],
  searchTerm: string,
  sortField: string,
  sortOrder: string,
  ownerFilter: string,
  page: number,
  pageSize: number,
) => {
  // Advanced search functionality (search multiple fields)
  const filteredTokens = tokens
    .filter(token => {
      const matchesSearchTerm =
        searchTerm === '' || token.collection.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesOwnerFilter = ownerFilter === '' || token.owner.yat === ownerFilter;
      return matchesSearchTerm && matchesOwnerFilter;
    })
    .sort((a, b) => {
      const fieldA = sortField === 'amount' ? a.transaction.amount : a.transaction.date;
      const fieldB = sortField === 'amount' ? b.transaction.amount : b.transaction.date;

      if (fieldA === fieldB) {
        return 0;
      } else if (sortOrder === 'asc') {
        return fieldA < fieldB ? -1 : 1;
      } else {
        return fieldA > fieldB ? -1 : 1;
      }
    });

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedTokens = filteredTokens.slice(start, end);

  return {
    tokens: paginatedTokens,
    total_tokens: filteredTokens.length,
    next_page: end < filteredTokens.length ? page + 1 : null,
  };
};
