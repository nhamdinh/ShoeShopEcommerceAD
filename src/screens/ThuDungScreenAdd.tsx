import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MainProducts from "../components/Products/MainProducts";
import ExportGio from "../components/ThuDung/ExportGio";
export default function ThuDungScreenAdd() {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <ExportGio isBan={true}/>
      </main>
    </>
  );
}
