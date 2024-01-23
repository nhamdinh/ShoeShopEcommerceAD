import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MainProducts from "../components/Products/MainProducts";
import SumGio from "../components/ThuDung/SumGio";
export default function ThuDungScreenSum() {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <SumGio />
      </main>
    </>
  );
}
