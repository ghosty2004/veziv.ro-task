import { Routes, Route } from 'react-router-dom';
import { NotFound } from '@/components';
import { getPages } from '@/utils';
import { ContextProvider } from './context';

function App() {
  const pages = getPages();

  return (
    <ContextProvider>
      <Routes>
        {pages.map(({ Component, pagePath }, index) => (
          <Route key={index} path={pagePath} element={<Component />} />
        ))}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </ContextProvider>
  );
}

export default App;
