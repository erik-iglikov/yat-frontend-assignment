import { CollectionInfo } from 'containers/CollectionInfo';
import React, {useEffect} from 'react';
import { useQuery } from 'react-query';

export const Collection = () => {
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
        <main>
            <section className='main-page'>
                <section className='collection-header'>
                    <CollectionInfo
                        name={collection.data?.pod.title}
                        description={collection.data?.pod.description}
                        imageSrc={collection.data?.pod.tokens[0].asset.url}
                        />
                    <section className='stats'>
                        <section className='tokens'>
                            ASSETS
                            {collection.data?.pod.stats.tokens}
                        </section>

                        <section className='owners'>
                            HOLDERS
                            {collection.data?.pod.stats.owners}
                        </section>

                        <section className='volume'>
                            VOLUME
                            {collection.data?.pod.stats.volume.daily}
                        </section>

                        <section className='floor-price'>
                            FLOOR PRICE
                            {collection.data?.pod.stats.floorPrice.current}
                        </section>
                    </section>
                </section>

                <section className='collection-tokens'>
                    {
                        collection.data?.pod.tokens.map((token: {asset: { url: string}}, index: number) => 
                        <img src={token.asset.url} key={index} alt="Collection token"/>)
                    }
                </section>
            </section>
        </main>
    );
}

export default Collection;
