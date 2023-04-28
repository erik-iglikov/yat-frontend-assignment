import { render, fireEvent } from '@testing-library/react';
import { IconButton } from './IconButton';
import { ICON_NAMES } from 'constants/iconNames';

describe('IconButton', () => {
  const defaultProps = {
    iconName: ICON_NAMES.PROFILE,
    onClick: jest.fn(),
  };

  it('renders the IconButton component', () => {
    const { getByRole } = render(<IconButton {...defaultProps} />);
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('renders the correct icon', () => {
    const { getByTestId } = render(<IconButton {...defaultProps} />);
    const icon = getByTestId('icon');
    expect(icon.querySelector('use')).toHaveAttribute(
      'xlink:href',
      `/icons-sprite.svg#${defaultProps.iconName}`,
    );
  });

  it('handles onClick event', () => {
    const { getByRole } = render(<IconButton {...defaultProps} />);
    const button = getByRole('button');
    fireEvent.click(button);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
});
