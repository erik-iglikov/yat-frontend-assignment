import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Pod } from './Pod';

// Create a custom render function to wrap the component with QueryClientProvider
const renderWithQueryClient = (component: JSX.Element) => {
  const queryClient = new QueryClient();

  return render(<QueryClientProvider client={queryClient}>{component}</QueryClientProvider>);
};

describe('Pod component', () => {
  it('renders Pod component without crashing', () => {
    renderWithQueryClient(<Pod />);
    expect(screen.getByText('Collection Activity')).toBeInTheDocument();
  });

  // Add more test cases here
});
