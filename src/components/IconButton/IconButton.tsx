import clsx from 'clsx';
import { Icon } from 'components/Icon';
import { ICON_NAMES } from 'constants/iconNames';
import { ClassNameProps } from 'types';

export type IconButtonProps = ClassNameProps & {
  iconName?: (typeof ICON_NAMES)[keyof typeof ICON_NAMES];
  size?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
};

export const IconButton = ({
  iconName,
  size = 'large',
  onClick,
  className,
  disabled = false,
  children,
}: IconButtonProps) => (
  <button className={clsx('icon-button', className)} onClick={onClick} disabled={disabled}>
    {iconName && <Icon iconName={iconName} size={size} />}
    {children}
  </button>
);
