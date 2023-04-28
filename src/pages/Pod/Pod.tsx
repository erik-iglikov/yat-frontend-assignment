import { useState } from 'react';
import { useQuery, useInfiniteQuery } from 'react-query';

import { PodInfo } from 'containers/PodInfo';
import { TokenCard } from 'containers/TokenCard/TokenCard';
import { PodStats } from 'containers/PodStats';

import "./pod.module.scss"
import ICON_NAMES from 'constants/iconNames';
import { Icon } from 'components/Icon';
import { useDebounce } from 'hooks/useDebounce';
import { useInfiniteScroll } from 'hooks/useInfiniteScroll';
import { TokenType } from 'types';
import { Spinner } from 'components/Spinner';

export const Pod = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 450);

    const [sortField, setSortField] = useState('date');
    const [sortOrder, setSortOrder] = useState('asc');
    const [ownerFilter, setOwnerFilter] = useState('');

    const fetchCollection = async () => {
        const url = `http://mock-server/collection/pod`;
        const res = await fetch(url);
        return res.json();
    };

    const fetchTokens = async ({ pageParam = 1 }) => {
        const params = new URLSearchParams({
            search_term: searchTerm,
            sort_field: sortField,
            sort_order: sortOrder,
            owner: ownerFilter,
            page: pageParam.toString(),
        });

        const url = `http://mock-server/collection/tokens?${params.toString()}`;
        const res = await fetch(url);
        const data = await res.json();

        return {
            pages: data.tokens,
            nextPage: data.next_page
        };
    };

    const collection = useQuery('collection', fetchCollection);

    const {
        data: tokens,
        fetchNextPage,
        hasNextPage,
        isLoading: tokensLoading,
        isFetchingNextPage,
    } = useInfiniteQuery(
        ['tokens', debouncedSearchTerm, sortField, sortOrder, ownerFilter],
        fetchTokens,
        {
            getNextPageParam: (lastPage) => lastPage.nextPage,
        }
    );

    const targetRef = useInfiniteScroll<HTMLDivElement>(() => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    });

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
    }

    return (
        <section className='main-page'>
            <section className='collection-header'>
                <PodInfo data={collection.data} />
                <PodStats data={collection.data?.stats} />
            </section>

            <section className='collection-filters'>
                <section className='title-search-row'>
                    <h3>Collection Activity</h3>

                    <div className='search-wrapper'>
                        <Icon iconName={ICON_NAMES.SEARCH} />
                        <input
                            type="text"
                            placeholder='Search...'
                            className='search-bar'
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </section>

                <section className='filter-row'>
                    <section className='left-filters'>
                        <div className='switch-button'>
                            <button disabled={sortOrder === 'asc'} onClick={() => handleSortOrderChange('asc')}>
                                <Icon iconName={ICON_NAMES.ARROW_UP} size='small' />
                            </button>
                            <button disabled={sortOrder === 'desc'} onClick={() => handleSortOrderChange('desc')}>
                                <Icon iconName={ICON_NAMES.ARROW_DOWN} size='small' />
                            </button>
                        </div>
                        <button disabled={sortField === 'date'} onClick={() => handleSortFieldChange('date')}>
                            Recency
                        </button>
                        <button disabled={sortField === 'amount'} onClick={() => handleSortFieldChange('amount')}>
                            Price
                        </button>
                    </section>

                    <section className='right-filters'>
                        <button disabled={ownerFilter === ''} onClick={() => handleOwnerFilterChange('')}>
                            All items
                        </button>
                        <button disabled={ownerFilter === collection.data?.owner.yat} onClick={() => handleOwnerFilterChange(collection.data?.owner.yat)}>
                            My items
                        </button>
                        <button disabled>
                            <Icon iconName={ICON_NAMES.FILTER} size='small' />
                            More filters
                        </button>
                    </section>
                </section>
            </section>
            
            <section className="collection-tokens">
                {tokensLoading ? (
                    <div className="loading-spinner">
                        <Spinner />
                    </div>
                ) : (
                    <>
                        {tokens?.pages.map((pageData, pageIndex: number) => {
                            return (pageData.pages.map((token: TokenType, index: number) => (
                                <TokenCard
                                    key={`${pageIndex}-${index}`}
                                    data={token}
                                />
                            )))
                        })}
                    </>
                )}


                <div ref={targetRef} style={{ height: 1 }} />
            </section>
        </section>
    );
}