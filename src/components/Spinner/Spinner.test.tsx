import { render } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders the Spinner component with default size', () => {
    const { container } = render(<Spinner />);
    expect(container.firstChild).toHaveClass('spinner');
    expect(container.firstChild).toHaveClass('big');
  });

  it('renders the Spinner component with small size', () => {
    const { container } = render(<Spinner size="small" />);
    expect(container.firstChild).toHaveClass('spinner');
    expect(container.firstChild).toHaveClass('small');
  });
});
