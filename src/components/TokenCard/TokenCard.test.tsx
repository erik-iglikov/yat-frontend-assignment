import { render } from '@testing-library/react';
import { TokenCard } from './TokenCard';
import { randomTokens } from 'mocks/handlers/randomizingUtils';

describe('TokenCard', () => {
  const [mockData] = randomTokens(1);

  it('renders the TokenCard component with given data', () => {
    const { getByText, getByAltText } = render(<TokenCard data={mockData} />);

    // Access the id from the asset object
    const altText = `${mockData.collection.name} #${mockData.asset.id}`;
    expect(getByAltText(altText)).toBeInTheDocument();
    expect(getByText(mockData.collection.name)).toBeInTheDocument();
    expect(getByText(`${mockData.collection.name} #${mockData.asset.id}`)).toBeInTheDocument();

    if (mockData.owner.twitter) {
      expect(getByText(mockData.owner.twitter)).toBeInTheDocument();
    } else if (mockData.owner.yat) {
      expect(getByText(mockData.owner.yat)).toBeInTheDocument();
    }
  });
});
