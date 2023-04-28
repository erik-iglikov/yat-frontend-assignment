import clsx from 'clsx';
import { ICON_NAMES } from 'constants/iconNames';
import { ClassNameProps } from 'types';

export type IconProps = ClassNameProps & {
  iconName: (typeof ICON_NAMES)[keyof typeof ICON_NAMES];
  size?: string;
};

export const Icon = ({ iconName, size = 'medium', className }: IconProps) => {
  return (
    <svg className={clsx(`icon icon--${size}`, className)} data-testid="icon">
      <use xlinkHref={`/icons-sprite.svg#${iconName}`} />
    </svg>
  );
};
