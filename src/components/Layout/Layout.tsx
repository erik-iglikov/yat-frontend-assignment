import { NavigationBar } from 'components/NavigationBar';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <section className="main-layout">
      <header>
        <NavigationBar data-testid="navigation-bar" />
      </header>

      <main>{children}</main>

      <footer></footer>
    </section>
  );
};
