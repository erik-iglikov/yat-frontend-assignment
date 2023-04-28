import { render } from '@testing-library/react';
import { Layout } from './Layout';

describe('Layout', () => {
  it('renders the Layout component', () => {
    const { container } = render(<Layout children={<div />} />);
    expect(container.firstChild).toHaveClass('main-layout');
  });

  it('renders the NavigationBar component', () => {
    const { getByTestId } = render(<Layout children={<div />} />);
    expect(getByTestId('navigation-bar')).toBeInTheDocument();
  });

  it('renders the children correctly', () => {
    const children = <div data-testid="children">Test Children</div>;
    const { getByTestId } = render(<Layout children={children} />);
    expect(getByTestId('children')).toBeInTheDocument();
  });
});
