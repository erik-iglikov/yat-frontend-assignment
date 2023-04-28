import clsx from 'clsx';
import { PodType } from 'types/PodProps';
import { Spinner } from 'components/Spinner';
import './pod-info.module.scss';
import { ClassNameProps } from 'types';

type PodInfoProps = ClassNameProps & {
  data: PodType;
};

export const PodInfo = ({ data, className }: PodInfoProps) => {
  return (
    <article className={clsx('pod-info', className)}>
      <div className="cover-container">
        <div className="cover-placeholder"></div>

        {data?.cover.url ? (
          <img className="cover" src={data?.cover.url} alt="Collection cover" />
        ) : (
          <Spinner />
        )}
      </div>

      <div className="content">
        <h2 className="name">{data?.name}</h2>
        <p className="description">{data?.description}</p>
      </div>
    </article>
  );
};
