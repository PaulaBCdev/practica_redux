import type { ReactNode } from "react";
import Header from "./header";
import Footer from "./footer";
import "./layout.css";
import { useLocation } from "react-router";
import LoginHeader from "./login-header";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="layout">
      {location.pathname === "/login" ? <LoginHeader /> : <Header />}
      <main className="layout-main">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
