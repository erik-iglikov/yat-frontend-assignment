import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import { Pod } from 'pages/Pod';
import { Layout } from 'components/Layout';
import React from 'react';

// Mock Pod and Layout components
jest.mock('pages/Pod', () => ({
  Pod: () => <div data-testid="pod-mock" />,
}));

jest.mock('components/Layout', () => ({
  Layout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="layout-mock">{children}</div>
  ),
}));

describe('App component', () => {
  it('renders the Layout and Pod components', () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>,
    );

    expect(screen.getByTestId('layout-mock')).toBeInTheDocument();
    expect(screen.getByTestId('pod-mock')).toBeInTheDocument();
  });
});
