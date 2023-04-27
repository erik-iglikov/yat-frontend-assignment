import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

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

    const fetchCollection = async () => {
        const params = new URLSearchParams({
            search_term: searchTerm,
            sort_field: sortField,
            sort_order: sortOrder,
            page: page.toString(),
        });

        const url = `http://mock-server/collection/test?${params.toString()}`;
        const res = await fetch(url);
        return res.json();
    };

    const collection = useQuery(['collection', searchTerm, sortField, sortOrder, page], fetchCollection);

    useEffect(() => {
        console.log('#############');
        console.log(collection.data);
        console.log('#############');
    }, [collection]);

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
                <PodInfo data={collection.data?.pod} />
                <PodStats data={collection.data?.pod?.stats} />
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
                                <Icon iconName={ICON_NAMES.ARROW_UP} size='small'/>
                            </button>
                            <button disabled={sortOrder === 'desc'} onClick={() => handleSortOrderChange('desc')}>
                                <Icon iconName={ICON_NAMES.ARROW_DOWN} size='small'/>
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
                    collection.data?.pod.tokens.map((token: any, index: number) =>
                        <TokenCard
                            key={index}
                            data={token}
                        />
                    )
                }
            </section>

            {/* Add your preferred pagination component here and bind handlePageChange to its onChange event */}
            {/* You can also use collection.data?.pod.stats to display total pages, total items, etc */}
               <section className='pagination'>
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                >
                    Previous
                </button>

                <span>Page {page} of {collection.data?.pod.stats.totalPages}</span>

                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === collection.data?.pod.stats.totalPages}
                >
                    Next
                </button>
            </section>
        </section>
    );
}