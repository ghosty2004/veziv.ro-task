import { Routes, Route } from 'react-router-dom';
import { NotFound } from '@/components';
import * as pages from './pages';
import { ContextProvider } from './context';

function App() {
  return (
    <ContextProvider>
      <Routes>
        {Object.entries(pages).map(([key, Node]) => (
          <Route key={key} path={Node.pagePath} element={<Node />} />
        ))}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </ContextProvider>
  );
}

export default App;
