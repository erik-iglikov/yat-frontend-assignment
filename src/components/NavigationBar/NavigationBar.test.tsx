import { render } from '@testing-library/react';
import { NavigationBar } from './NavigationBar';
import { IconButton } from 'components/IconButton';
import { ICON_NAMES } from 'constants/iconNames';

jest.mock('components/IconButton', () => ({
  IconButton: jest.fn(({ iconName }) => <button data-testid={`icon-button-${iconName}`} />),
}));

describe('NavigationBar', () => {
  it('renders the NavigationBar component', () => {
    const { container } = render(<NavigationBar />);
    expect(container.firstChild).toHaveClass('navigation-bar');
  });

  it('renders all IconButton components with correct icon names', () => {
    const { getByTestId } = render(<NavigationBar />);
    expect(IconButton).toHaveBeenCalledTimes(4);
    expect(getByTestId(`icon-button-${ICON_NAMES.HOME}`)).toBeInTheDocument();
    expect(getByTestId(`icon-button-${ICON_NAMES.PROFILE}`)).toBeInTheDocument();
    expect(getByTestId(`icon-button-${ICON_NAMES.EMOJI}`)).toBeInTheDocument();
    expect(getByTestId(`icon-button-${ICON_NAMES.DIAMOND}`)).toBeInTheDocument();
  });
});
