interface IProps {
  title: string;
  children: React.ReactNode;
}

const Header = () => (
  <div className="w-full h-16 bg-black/95 flex items-center justify-center">
    <h1 className="text-4xl text-white">Header</h1>
  </div>
);

const Footer = () => (
  <div className="mt-auto w-full h-16 bg-black/95 flex items-center justify-center">
    <h1 className="text-4xl text-white">Footer</h1>
  </div>
);

export const Layout = ({ title, children }: IProps) => {
  return (
    <div className="w-screen min-h-screen flex flex-col bg-black/95">
      <Header />

      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl text-white">{title}</h1>
        {children}
      </div>

      <Footer />
    </div>
  );
};
