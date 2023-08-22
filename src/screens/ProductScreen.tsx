import React from "react";
import Header from "../components/Header";
import MainProducts from "../components/products";
import Sidebar from "../components/Sidebar";

const ProductScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainProducts />
      </main>
    </>
  );
};

export default ProductScreen;
