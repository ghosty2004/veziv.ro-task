import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
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
          <p className="max-md:hidden">Digital Worker Showcased Works</p>
          <p className="hidden max-md:block">DWSW</p>
        </span>
      </div>
      <div className="flex gap-10 cursor-pointer max-sm:hidden">
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
        className="bg-violet-600 hover:bg-violet-600/90 p-2 rounded-lg max-sm:hidden"
        onClick={handlePageSwitch('/account')}
      >
        My account
      </button>
      <div className="hidden max-sm:block">
        <GiHamburgerMenu size={30} />
      </div>
    </div>
  );
};

const Footer = () => (
  <div className="mt-auto w-full h-16 bg-black/95 flex items-center justify-between px-10 max-md:text-xs">
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
    <div className="w-screen min-h-screen flex flex-col bg-black/95 break-all">
      <Header />

      <div className="flex flex-col gap-10 container mx-auto my-10">
        <h1 className="text-4xl text-white uppercase max-md:text-2xl">
          {title}
        </h1>
        {children}
      </div>

      <Footer />
    </div>
  );
};
