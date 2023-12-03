import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { getPages } from '@/utils';

export const Header = () => {
  const pages = getPages();
  const navigate = useNavigate();

  const handlePageSwitch = (pagePath: string) => () => navigate(pagePath);

  return (
    <div
      data-testid="header"
      className="w-full h-16 bg-black/95 flex flex-wrap items-center justify-between px-10"
    >
      <div className="flex">
        <span className="uppercase font-bold">
          <p className="max-md:hidden">Digital Worker Showcased Works</p>
          <p className="hidden max-md:block">DWSW</p>
        </span>
      </div>
      <div
        data-testid="pages"
        className="flex gap-10 cursor-pointer max-sm:hidden"
      >
        {pages
          .filter(({ visibleInHeader }) => visibleInHeader)
          .map(({ pageName, pagePath }, index) => (
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
        data-testid="my-account-button"
        className="bg-violet-600 hover:bg-violet-600/90 p-2 rounded-lg max-sm:hidden"
        onClick={handlePageSwitch('/account')}
      >
        My account
      </button>
      <div className="hidden max-sm:block" data-testid="hamburger-menu">
        <GiHamburgerMenu size={30} />
      </div>
    </div>
  );
};

export const Footer = () => (
  <div
    data-testid="footer"
    className="mt-auto w-full h-16 bg-black/95 flex flex-wrap items-center justify-between px-10 max-md:text-xs"
  >
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

interface IProps {
  title?: string;
  children: React.ReactNode;
}

export const Layout = ({ title, children }: IProps) => {
  if (typeof title !== 'undefined') window.document.title = title;

  return (
    <div
      data-testid="layout"
      className="w-screen min-h-screen flex flex-col bg-black/95 break-all"
    >
      <Header />

      <div className="flex flex-col gap-10 container mx-auto my-10">
        {title && (
          <h1 className="text-4xl text-white uppercase max-md:text-2xl">
            {title}
          </h1>
        )}
        {children}
      </div>

      <Footer />
    </div>
  );
};
