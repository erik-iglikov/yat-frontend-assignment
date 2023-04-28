import { useEffect, useState } from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';

import { PodInfo } from 'containers/PodInfo';
import { TokenCard } from 'containers/TokenCard/TokenCard';
import { PodStats } from 'containers/PodStats';

import "./pod.module.scss"
import ICON_NAMES from 'constants/iconNames';
import { Icon } from 'components/Icon';

export const Pod = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('recency');
    const [sortOrder, setSortOrder] = useState('asc');
    const [page, setPage] = useState(1);
    const [tokens, setTokens] = useState([]);

    const fetchCollection = async () => {
        const url = `http://mock-server/collection/pod`;
        const res = await fetch(url);
        return res.json();
    };

    const fetchTokens = async () => {
        const params = new URLSearchParams({
            search_term: searchTerm,
            sort_field: sortField,
            sort_order: sortOrder,
            page: page.toString(),
        });

        const url = `http://mock-server/collection/tokens?${params.toString()}`;
        const res = await fetch(url);
        const data = await res.json();
        console.log('---res.json()', data)

        return data;
    };

    const collection = useQuery('collectionInfo', fetchCollection);

    const tokensQuery = useQuery(['tokens', searchTerm, sortField, sortOrder, page], fetchTokens, {
        enabled: false,
    });

    useEffect(() => {
        if (collection.isSuccess) {
            setTokens(collection.data.tokens);
        }
    }, [collection]);

    useEffect(() => {
        if (tokensQuery.isSuccess) {
            setTokens(tokensQuery.data);
        }
    }, [tokensQuery]);

    // Fetch tokens when searchTerm, sortField or sortOrder changes
    useEffect(() => {
        if (searchTerm || sortField !== 'recency' || sortOrder !== 'asc') {
            tokensQuery.refetch();
        }
    }, [searchTerm, sortField, sortOrder]);

    if (collection.isLoading) {
        return <div>Loading...</div>;
    }


    //   if (collection.error || tokens.error) {
    //     return <div>Error: {(collection.error || tokens.error).message}</div>;
    //   }


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchTerm(e.target.value);
    };

    const handleSortFieldChange = (field: string): void => {
        setSortField(field);
    };

    const handleSortOrderChange = (order: string): void => {
        setSortOrder(order);
    };

    const handlePageChange = (newPage: number): void => {
        setPage(newPage);
    };

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
                        <button disabled={sortField === 'recency'} onClick={() => handleSortFieldChange('recency')}>
                            Recency
                        </button>
                        <button disabled={sortField === 'price'} onClick={() => handleSortFieldChange('price')}>
                            Price
                        </button>
                    </section>

                    <section className='right-filters'>
                        <button disabled>
                            All items
                        </button>
                        <button>
                            My items
                        </button>
                        <button disabled>
                            <Icon iconName={ICON_NAMES.FILTER} size='small' />
                            More filters
                        </button>
                    </section>
                </section>
            </section>

            <section className='collection-tokens'>
                {
                    (collection.isLoading || tokensQuery.isLoading) ? (
                        <div>
                            <h2>Loading...</h2>
                        </div>
                    ) : (
                        tokens && tokens.map((token: any, index: number) =>
                            <TokenCard
                                key={index}
                                data={token}
                            />
                        )
                    )
                }
            </section>

            {/* Add your preferred pagination component here and bind handlePageChange to its onChange event */}
            {/* You can also use collection.data?.stats to display total pages, total items, etc */}
            <section className='pagination'>
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                >
                    Previous
                </button>

                <span>Page {page} of {collection.data?.stats.totalPages}</span>

                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === collection.data?.stats.totalPages}
                >
                    Next
                </button>
            </section>
        </section>
    );
}