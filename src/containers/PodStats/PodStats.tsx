import { StatCard } from 'components/StatCard';
import { StatsType } from 'types'
import './pod-stats.module.scss'
import { Icon } from 'components/Icon';
import { ICON_NAMES } from 'constants/iconNames';

export const PodStats = ({ data }: { data: StatsType }) => {
    return (
        <section className='stats'>
            <StatCard
                label="ASSETS"
                value={data?.tokens}
            />
            <StatCard
                label="HOLDERS"
                value={data?.owners}
            />
            <StatCard
                label="VOLUME"
                value={data?.volume?.daily}
            />
            <StatCard
                label="FLOOR PRICE"
                value={data?.floorPrice?.current}
                icon={
                    <Icon 
                        iconName={ICON_NAMES.ETH}
                        size='xlarge'/>
                }
            />
        </section>
    )
}