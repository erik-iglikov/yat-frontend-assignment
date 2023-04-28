import { render } from '@testing-library/react';
import { StatCard } from './StatCard';

describe('StatCard', () => {
  it('renders the StatCard component with label and value', () => {
    const { getByText } = render(<StatCard label="Test Label" value="100" />);
    expect(getByText('Test Label')).toBeInTheDocument();
    expect(getByText('100')).toBeInTheDocument();
  });

  it('renders the Spinner when value is missing', () => {
    const { queryByText, getByTestId } = render(<StatCard label="Test Label" value="" />);
    expect(queryByText('100')).toBeNull();
    expect(getByTestId('spinner')).toBeInTheDocument();
  });
});
