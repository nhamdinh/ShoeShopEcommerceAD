import React from "react";
import Header from "../components/Header";
import AddProductMain from "../components/Products/AddProductMain";
import Sidebar from "../components/Sidebar";

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
