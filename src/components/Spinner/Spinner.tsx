import clsx from 'clsx';
import { ClassNameProps } from 'types';
import './spinner.module.scss';

type SpinnerProps = ClassNameProps & {
  size?: 'small' | 'big';
};

export const Spinner = ({ size = 'big', className }: SpinnerProps) => (
  <div className={clsx('spinner', size, className)} data-testid="spinner">
    <div className="spinner-circle"></div>
  </div>
);
