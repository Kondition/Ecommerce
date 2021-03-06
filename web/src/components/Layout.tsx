import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};
