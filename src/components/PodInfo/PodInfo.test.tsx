import { render } from '@testing-library/react';
import { PodInfo } from './PodInfo';
import { randomTokens, randomOwner, randomAsset } from 'mocks/handlers/randomizingUtils';

describe('PodInfo', () => {
  const mockData = {
    name: 'Test Pod',
    description: 'This is a test pod',
    cover: randomAsset(),
    owner: randomOwner(),
    tokens: randomTokens(5),
    stats: {
      tokens: 100,
      owners: 50,
      volume: { daily: 5000, weekly: 10000, monthly: 20000 },
      floorPrice: { current: 10 },
    },
  };

  it('renders the PodInfo component with given data', () => {
    const { getByText, getByAltText } = render(<PodInfo data={mockData} />);
    expect(getByText('Test Pod')).toBeInTheDocument();
    expect(getByText('This is a test pod')).toBeInTheDocument();
    expect(getByAltText('Collection cover')).toHaveAttribute('src', mockData.cover.url);
  });

  it('renders the Spinner when cover url is missing', () => {
    const { queryByAltText, getByTestId } = render(
      <PodInfo data={{ ...mockData, cover: { id: 1, url: '' } }} />,
    );
    expect(queryByAltText('Collection cover')).toBeNull();
    expect(getByTestId('spinner')).toBeInTheDocument();
  });
});
