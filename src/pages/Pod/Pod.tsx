import { useState } from 'react';
import { useQuery, useInfiniteQuery } from 'react-query';

import { PodInfo } from 'components/PodInfo';
import { TokenCard } from 'components/TokenCard';
import { PodStats } from 'components/PodStats';
import { Icon } from 'components/Icon';
import { useDebounce } from 'hooks/useDebounce';
import { useInfiniteScroll } from 'hooks/useInfiniteScroll';
import { TokenType } from 'types/PodProps';
import { Spinner } from 'components/Spinner';
import { IconButton } from 'components/IconButton';
import { SearchBar } from 'components/SearchBar';

import ICON_NAMES from 'constants/iconNames';
import { POD_API_URL, TOKENS_API_URL } from 'constants/apiUrls';

import './pod.module.scss';

export const Pod = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 450);

  const [sortField, setSortField] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');
  const [ownerFilter, setOwnerFilter] = useState('');

  // Fetch collection data
  const fetchCollection = async () => {
    try {
      const url = POD_API_URL;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Error fetching collection data.');
      return res.json();
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  };

  // Fetch tokens data
  const fetchTokens = async ({ pageParam = 1 }) => {
    try {
      const params = new URLSearchParams({
        search_term: searchTerm,
        sort_field: sortField,
        sort_order: sortOrder,
        owner: ownerFilter,
        page: pageParam.toString(),
      });

      const url = `${TOKENS_API_URL}?${params.toString()}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Error fetching tokens data.');
      const data = await res.json();

      return {
        pages: data.tokens,
        nextPage: data.next_page,
      };
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  };

  // React Query hooks for fetching data
  const collection = useQuery('collection', fetchCollection, { retry: 3 });

  // Query tokens with infinite scrolling
  const {
    data: tokens,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError: tokensError,
  } = useInfiniteQuery(
    ['tokens', debouncedSearchTerm, sortField, sortOrder, ownerFilter],
    fetchTokens,
    {
      getNextPageParam: lastPage => lastPage.nextPage,
      retry: 3,
    },
  );

  // Infinite scroll hook
  const targetRef = useInfiniteScroll<HTMLDivElement>(() => {
    if (hasNextPage && !isFetchingNextPage && tokens?.pages.length) {
      fetchNextPage();
    }
  });

  // Event handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const handleSortFieldChange = (field: string): void => {
    setSortField(field);
  };

  const handleSortOrderChange = (order: string): void => {
    setSortOrder(order);
  };

  const handleOwnerFilterChange = (owner: string): void => {
    setOwnerFilter(owner);
  };

  return (
    <section className="main-page">
      <section className="collection-header">
        <PodInfo data={collection.data} />
        <PodStats data={collection.data?.stats} />
      </section>

      <section className="collection-filters">
        <section className="title-search-row">
          <h3>Collection Activity</h3>
          <SearchBar value={searchTerm} onChange={handleSearchChange} />
        </section>

        <section className="filter-row">
          <section className="left-filters">
            <div className="switch-button">
              <IconButton
                disabled={sortOrder === 'asc'}
                onClick={() => handleSortOrderChange('asc')}
              >
                <Icon iconName={ICON_NAMES.ARROW_UP} size="small" />
              </IconButton>
              <IconButton
                disabled={sortOrder === 'desc'}
                onClick={() => handleSortOrderChange('desc')}
              >
                <Icon iconName={ICON_NAMES.ARROW_DOWN} size="small" />
              </IconButton>
            </div>
            <IconButton
              disabled={sortField === 'date'}
              onClick={() => handleSortFieldChange('date')}
            >
              Recency
            </IconButton>
            <IconButton
              disabled={sortField === 'amount'}
              onClick={() => handleSortFieldChange('amount')}
            >
              Price
            </IconButton>
          </section>

          <section className="right-filters">
            <IconButton disabled={ownerFilter === ''} onClick={() => handleOwnerFilterChange('')}>
              All items
            </IconButton>
            <IconButton
              disabled={ownerFilter === collection.data?.owner.yat}
              onClick={() => handleOwnerFilterChange(collection.data?.owner.yat)}
            >
              My items
            </IconButton>
            <IconButton disabled onClick={() => {}}>
              <Icon iconName={ICON_NAMES.FILTER} size="small" />
              More filters
            </IconButton>
          </section>
        </section>
      </section>

      <section className="collection-tokens">
        {tokensError ? (
          <div className="error-message">Error fetching tokens. Please try again later.</div>
        ) : (
          <>
            {tokens?.pages.map((pageData, pageIndex: number) => {
              return pageData.pages.map((token: TokenType, index: number) => (
                <TokenCard key={`${pageIndex}-${index}`} data={token} />
              ));
            })}
            {hasNextPage && (
              <div className="loading-spinner">
                <Spinner />
              </div>
            )}
          </>
        )}

        <div ref={targetRef} style={{ height: 1 }} />
      </section>
    </section>
  );
};
