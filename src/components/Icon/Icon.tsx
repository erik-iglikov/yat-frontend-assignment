import ICON_NAMES from 'constants/iconNames';

export type IconProps = {
  // checks that iconName exists in ICON_NAMES
  iconName: (typeof ICON_NAMES)[keyof typeof ICON_NAMES];
  size?: string;
};

export const Icon = ({ iconName, size = 'medium' }: IconProps) => {
  return (
    <svg className={`icon icon--${size}`}>
      <use xlinkHref={`/icons-sprite.svg#${iconName}`} />
    </svg>
  );
};
