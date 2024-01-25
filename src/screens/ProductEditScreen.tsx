import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import EditProductMain from "../components/Products/EditproductMain";

const ProductEditScreen = () => {
  return (
    <main className="main-wrap">
      <EditProductMain />
    </main>
  );
};
export default ProductEditScreen;
