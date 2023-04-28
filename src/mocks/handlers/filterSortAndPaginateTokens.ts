import { TokenType } from "types";

export const filterSortAndPaginateTokens = (
  tokens: TokenType[],
  searchTerm: string,
  sortField: string,
  sortOrder: string,
  ownerFilter: string | '',
  page: number,
  pageSize: number) => {

  // Apply filters
  let filteredTokens = tokens.filter((token) => {
    const matchesSearchTerm =
      !searchTerm ||
      token.collection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.owner.yat.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesOwnerFilter = !ownerFilter || token.owner.yat === ownerFilter;

    return matchesSearchTerm && matchesOwnerFilter;
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
