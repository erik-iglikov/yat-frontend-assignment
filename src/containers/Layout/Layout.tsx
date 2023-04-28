import { NavigationBar } from 'components/NavigationBar';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="main-layout">
      <header>
        <NavigationBar />
      </header>

      <main>{children}</main>

      <footer></footer>
    </section>
  );
};
