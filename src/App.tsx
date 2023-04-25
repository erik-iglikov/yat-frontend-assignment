import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Pod from './pages/Pod';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <header></header>

      <main className="layout">
        <Pod />
      </main>
      
      <footer></footer>
    </QueryClientProvider>
  );
}

export default App;
