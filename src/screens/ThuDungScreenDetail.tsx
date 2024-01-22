import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MainProducts from "../components/Products/MainProducts";
import GioDetail from "../components/ThuDung/GioDetail";
export default function ThuDungScreenDetail() {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <GioDetail />
      </main>
    </>
  );
}
