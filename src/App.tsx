import { QueryClient, QueryClientProvider } from 'react-query';
import { Pod } from 'pages/Pod';
import { Layout } from 'components/Layout';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Pod />
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
