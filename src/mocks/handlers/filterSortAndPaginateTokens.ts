import { TokenType } from 'types/index';

export const filterSortAndPaginateTokens = (
  tokens: TokenType[],
  searchTerm: string,
  sortField: string,
  sortOrder: string,
  ownerFilter: string,
  page: number,
  pageSize: number,
) => {
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
