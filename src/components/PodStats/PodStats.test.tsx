import { render } from '@testing-library/react';
import { PodStats } from './PodStats';

describe('PodStats', () => {
  const mockData = {
    tokens: 100,
    owners: 50,
    volume: { daily: 5000, weekly: 10000, monthly: 20000 },
    floorPrice: { current: 10 },
  };

  it('renders the PodStats component with given data', () => {
    const { getByText } = render(<PodStats data={mockData} />);
    expect(getByText('ASSETS')).toBeInTheDocument();
    expect(getByText('100')).toBeInTheDocument();
    expect(getByText('HOLDERS')).toBeInTheDocument();
    expect(getByText('50')).toBeInTheDocument();
    expect(getByText('VOLUME')).toBeInTheDocument();
    expect(getByText('5,000')).toBeInTheDocument();
    expect(getByText('FLOOR PRICE')).toBeInTheDocument();
    expect(getByText('10')).toBeInTheDocument();
  });
});
