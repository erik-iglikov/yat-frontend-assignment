import clsx from 'clsx';
import { StatCard } from 'components/StatCard';
import { StatsType } from 'types/PodProps';
import { Icon } from 'components/Icon';
import { ICON_NAMES } from 'constants/iconNames';
import { ClassNameProps } from 'types';
import './pod-stats.module.scss';

type PodStatsProps = ClassNameProps & {
  data: StatsType;
};

export const PodStats = ({ data, className }: PodStatsProps) => {
  return (
    <section className={clsx('stats', className)}>
      <StatCard label="ASSETS" value={data?.tokens} />
      <StatCard label="HOLDERS" value={data?.owners} />
      <StatCard label="VOLUME" value={data?.volume?.daily} />
      <StatCard
        label="FLOOR PRICE"
        value={data?.floorPrice?.current}
        icon={<Icon iconName={ICON_NAMES.ETH} size="xlarge" />}
      />
    </section>
  );
};
