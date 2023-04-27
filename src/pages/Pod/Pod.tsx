import { useEffect } from 'react';
import { useQuery } from 'react-query';

import { PodInfo } from 'containers/PodInfo';
import { TokenCard } from 'containers/TokenCard/TokenCard';
import { PodStats } from 'containers/PodStats';

import "./pod.module.scss"
import ICON_NAMES from 'constants/iconNames';
import { Icon } from 'components/Icon';

export const Pod = () => {
    // Fetch collection data (response will be mocked)
    const fetchCollection = async () => {
        const res = await fetch('http://mock-server/collection/test');
        return res.json();
    };
    const collection = useQuery('collection', fetchCollection);

    useEffect(() => {
        // Collection data will be accessible 
        // here, using the mock server.
        // To manipulate this reponse object,
        // change ./src/mocks/handlers/collection.ts
        console.log('#############');
        console.log(collection.data);
        console.log('#############');
    }, [collection]);

    return (
        <section className='main-page'>
            <section className='collection-header'>
                <PodInfo data={collection.data?.pod}/>
                <PodStats data={collection.data?.pod?.stats}/>
            </section>

            <section className='collection-filters'>
                <section className='title-search-row'>
                    <h3>Collection Activity</h3>
                    
                    <div className='search-wrapper'>
                        <Icon iconName={ICON_NAMES.SEARCH}/>
                        <input 
                            type="text"
                            placeholder='Search...'
                            className='search-bar'
                            onChange={() => {}}
                            />
                    </div>
                </section>

                <section className='filter-row'>
                    <section className='left-filters'>
                        <div className='switch-button'>
                            <button disabled>
                                <Icon iconName={ICON_NAMES.ARROW_UP} size='small'/>
                            </button>
                            <button>
                                <Icon iconName={ICON_NAMES.ARROW_DOWN} size='small'/>
                            </button>
                        </div>
                        <button disabled>
                            Recency
                        </button>
                        <button>
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
                            <Icon iconName={ICON_NAMES.FILTER} size='small'/>
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
        </section>
    );
}
