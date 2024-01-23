import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MainProducts from "../components/Products/MainProducts";
import ImportGio from "../components/ThuDung/ImportGio";
export default function ThuDungScreenListBuy() {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <ImportGio isBan={false}/>
      </main>
    </>
  );
}
