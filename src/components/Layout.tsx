import { useNavigate } from 'react-router-dom';
import * as pages from '@/pages';

interface IProps {
  title: string;
  children: React.ReactNode;
}

const Header = () => {
  const navigate = useNavigate();

  const handlePageSwitch = (pagePath: string) => () => navigate(pagePath);

  return (
    <div className="w-full h-16 bg-black/95 flex items-center justify-between px-10">
      <div className="flex">
        <span className="uppercase font-bold">
          Digital Worker Showcased Works
        </span>
      </div>
      <div className="flex gap-10 cursor-pointer">
        {Object.entries(pages)
          .filter(([_, { visibleInHeader }]) => visibleInHeader)
          .map(([pageName, { pagePath }], index) => (
            <span
              key={index}
              className={`hover:text-violet-500 ${
                window.location.pathname === pagePath
                  ? 'text-violet-500/90'
                  : ''
              }`}
              onClick={handlePageSwitch(pagePath)}
            >
              {pageName}
            </span>
          ))}
      </div>
      <button
        className="bg-violet-600 hover:bg-violet-600/90 p-2 rounded-lg"
        onClick={handlePageSwitch('/account')}
      >
        My account
      </button>
    </div>
  );
};

const Footer = () => (
  <div className="mt-auto w-full h-16 bg-black/95 flex items-center justify-between px-10">
    <span>
      made with ❤️ by{' '}
      <a className="hover:text-violet-400" href="https://github.com/ghosty2004">
        ghosty2004
      </a>
    </span>
    <span>
      for{' '}
      <a className="hover:text-violet-400" href="https://veziv.ro">
        veziv.ro
      </a>
    </span>
  </div>
);

export const Layout = ({ title, children }: IProps) => {
  window.document.title = title;

  return (
    <div className="w-screen min-h-screen flex flex-col bg-black/95">
      <Header />

      <div className="flex flex-col gap-10 pt-10 container mx-auto">
        <h1 className="text-4xl text-white uppercase">{title}</h1>
        {children}
      </div>

      <Footer />
    </div>
  );
};
