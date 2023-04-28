import clsx from 'clsx';
import { Icon } from 'components/Icon';
import ICON_NAMES from 'constants/iconNames';
import { ChangeEvent, useState } from 'react';
import { ClassNameProps } from 'types';
import './search-bar.module.scss';

export type SearchBarProps = ClassNameProps & {
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const SearchBar = ({
  placeholder = 'Search...',
  value: initialValue,
  onChange,
  className,
}: SearchBarProps) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange(event);
  };

  return (
    <div className={clsx('search-wrapper', className)}>
      <Icon iconName={ICON_NAMES.SEARCH} />
      <input
        type="text"
        placeholder={placeholder}
        className="search-bar"
        value={value}
        onChange={handleChange}
        data-testid="search-bar-input"
      />
    </div>
  );
};
