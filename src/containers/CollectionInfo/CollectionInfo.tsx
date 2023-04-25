import './collection-info.module.scss'

interface CollectionInfoProps {
    name: string;
    description: string;
    imageSrc: string;
}

export const CollectionInfo = ({
    name = 'Collection name',
    description = 'Collection description',
    imageSrc
}: CollectionInfoProps) => {
    return (
        <article className="collection-info">
            <div className='cover'>
                <img
                    src={imageSrc}
                    alt="Collection cover" />
            </div>
            <div className="content">
                <h2 className="name">{name}</h2>
                <p className="description">{description}</p>
            </div>
        </article>
    )
}