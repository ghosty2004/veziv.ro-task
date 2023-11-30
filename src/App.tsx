import { Routes, Route } from 'react-router-dom';
import { NotFound } from '@/components';
import * as pages from './pages';

function App() {
  return (
    <Routes>
      {Object.entries(pages).map(([key, Node]) => (
        <Route key={key} path={Node.pagePath} element={<Node />} />
      ))}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
