// components/Layout.js

//import Footer from "./Footer";
import Navigationbar from "./Navigationbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Navigationbar/>
      <main>{children}</main>
     <Footer/>
    </div>
  );
};

export default Layout;
