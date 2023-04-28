import { render } from '@testing-library/react';
import { Icon } from './Icon';
import { ICON_NAMES } from 'constants/iconNames';

describe('Icon', () => {
  const defaultProps = {
    iconName: ICON_NAMES.HOME,
  };

  it('renders the Icon component with the correct iconName', () => {
    const { getByTestId } = render(<Icon {...defaultProps} />);
    const icon = getByTestId('icon');
    expect(icon).toBeInTheDocument();
    expect(icon.querySelector('use')).toHaveAttribute(
      'xlink:href',
      `/icons-sprite.svg#${defaultProps.iconName}`,
    );
  });

  it('renders the Icon component with the correct size', () => {
    const { getByTestId } = render(<Icon {...defaultProps} size="large" />);
    const icon = getByTestId('icon');
    expect(icon).toHaveClass('icon--large');
  });

  it('renders the Icon component with the correct className', () => {
    const { getByTestId } = render(<Icon {...defaultProps} className="test-class" />);
    const icon = getByTestId('icon');
    expect(icon).toHaveClass('test-class');
  });
});
