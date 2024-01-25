import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import UserComponent from "../components/users";

const UsersScreen = () => {
  return (
    <main className="main-wrap">
      <UserComponent />
    </main>
  );
};

export default UsersScreen;
