import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { NotFound } from '@/components';
import { getPages } from '@/utils';
import { ContextProvider } from './context';
import * as pagesComponents from './pages';

import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

function App() {
  const pages = getPages();

  return (
    <div className="overflow-x-hidden">
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
      <ToastContainer position="bottom-right" className="mb-14" theme="dark" />
    </div>
  );
}

export default App;
