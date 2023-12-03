import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NotFound } from '@/components';
import { getPages } from '@/utils';
import { ContextProvider } from './context';
import * as pagesComponents from './pages';

const queryClient = new QueryClient();

function App() {
  const pages = getPages();

  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <Routes>
          {Object.entries(pagesComponents)
            .map(([pageName, Component]) => ({
              ...pages.find((f) => f.pageName === pageName)!,
              Component,
            }))
            .map(({ pagePath, Component }, index) => (
              <Route key={index} path={pagePath} element={<Component />} />
            ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ContextProvider>
    </QueryClientProvider>
  );
}

export default App;
