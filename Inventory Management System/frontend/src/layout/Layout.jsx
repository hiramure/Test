import React from "react";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Routers from "../routes/Routers.jsx";
import { Provider } from "react-redux";
import store from "../redux/features/store.js";
const Layout = () => {
  return (
    <>
      <Provider store={store}>
        <Header />
        <main>
          <Routers />
        </main>
        <Footer />
      </Provider>
    </>
  );
};

export default Layout;
