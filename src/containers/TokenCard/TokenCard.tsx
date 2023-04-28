import { getHumanReadableTimeAgo } from 'utils/getHumanReadableTimeAgo';
import './token-card.module.scss'
import { TokenType } from 'types'
import ICON_NAMES from 'constants/iconNames';
import { Icon } from 'components/Icon';

export const TokenCard = ({ data }: { data: TokenType }) => {
    return (
        <article className="token-card">
            <section className="image-container">
                <div className="badge">
                    {getHumanReadableTimeAgo(data.transaction.date)}
                </div>

                <img src={data.asset.url} alt={`${data.collection.name} #${data.asset.id}`} />

                <section className="sale-badge">
                    <span className="sale-badge-text">
                        Bought
                        {data.transaction.currency.toUpperCase() === 'ETH' &&
                            <Icon
                                iconName={ICON_NAMES.ETH}
                                size='small' />
                        }
                        {data.transaction.amount}
                    </span>
                </section>
            </section>

            <section className="token-details">
                <h6 className="collection-title">{data.collection.name} #{data.asset.id}</h6>
                <p className="collection-name">{data.collection.name}</p>
            </section>

            <section className="token-owner">
                <div className="token-owner-wrapper">
                    <div className="token-owner-info">
                        <div className="yat">
                            {data.owner.yat}
                        </div>

                        {!!data.owner.twitter &&
                            <div className="twitter">
                                <a className="twitter-link"
                                    href={`https://twitter.com/${data.owner.twitter}`}
                                    target="_blank"
                                    rel="noreferrer">
                                    <span>@</span>
                                    {data.owner.twitter}
                                </a>
                            </div>
                        }
                    </div>
                </div>
            </section>
        </article>
    )
}