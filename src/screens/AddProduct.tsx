import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import AddProductMain from "../components/Products/AddProductMain";

const AddProduct = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddProductMain />
      </main>
    </>
  );
};

export default AddProduct;
