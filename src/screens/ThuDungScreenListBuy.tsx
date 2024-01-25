import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MainProducts from "../components/Products/MainProducts";
import ImportGio from "../components/ThuDung/ImportGio";
export default function ThuDungScreenListBuy() {
  return (
    <main className="main-wrap">
      <ImportGio isBan={false} />
    </main>
  );
}
