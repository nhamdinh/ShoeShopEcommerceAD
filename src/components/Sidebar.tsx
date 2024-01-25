import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Sidebar = ({ showSideBar, cb_setshowSideBar }: any) => {
  const { t } = useTranslation();

  const arr: any = [
    {
      id: 8,
      to: "/thudung-list",
      text: "Thu Dung Pretty LIST BÁN",
      icon: <i className="icon fas fa-usd-circle"></i>,
    },
    {
      id: 9,
      to: "/thudung-create",
      text: "Thu Dung Pretty BÁN",
      icon: <i className="icon fas fa-usd-circle"></i>,
    },
    {
      id: 10,
      to: "/thudung-create-buy",
      text: "Thu Dung Pretty NHẬP",
      icon: <i className="icon fas fa-usd-circle"></i>,
    },
    {
      id: 11,
      to: "/thudung-list-buy",
      text: "Thu Dung Pretty LIST NHẬP",
      icon: <i className="icon fas fa-usd-circle"></i>,
    },
    {
      id: 12,
      to: "/thudung-sum",
      text: "Thu Dung Pretty SUM",
      icon: <i className="icon fas fa-usd-circle"></i>,
    },



    {
      id: 1,
      to: "/",
      text: "Dashboard",
      icon: <i className="icon fas fa-home"></i>,
    },
    {
      id: 2,
      to: "/products",
      text: "Products",
      icon: <i className="icon fas fa-shopping-bag"></i>,
    },
    {
      id: 3,
      to: "/orders",
      text: "Orders",
      icon: <i className="icon fas fa-bags-shopping"></i>,
    },
    {
      id: 4,
      to: "/users",
      text: "Users",
      icon: <i className="icon fas fa-user"></i>,
    },

    {
      id: 5,
      to: "/reviews",
      text: "Reviews",
      icon: <i className="icon fas fa-user"></i>,
    },

    {
      id: 6,
      to: "/sellers",
      text: "Sellers",
      icon: <i className="icon fas fa-store-alt"></i>,
    },
    {
      id: 7,
      to: "/transaction",
      text: "Transactions",
      icon: <i className="icon fas fa-usd-circle"></i>,
    },
  ];

  return (
    <aside className={`navbar-aside ${showSideBar ? "showzz" : ""}`}>
      <div className="aside-top">
        <Link to="/" className="brand-wrap">
          <img
            src="https://w.ladicdn.com/5bf3dc7edc60303c34e4991f/logo-02-20200903083638.svg"
            style={{ height: "46" }}
            className="logo"
            alt="Ecommerce dashboard template"
          />
        </Link>
        <div>
          <button
            className="btn btn-icon btn-aside-minimize"
            onClick={() => {
              cb_setshowSideBar(false);
            }}
          >
            <i className="text-muted fas fa-stream"></i>
          </button>
        </div>
      </div>

      <nav>
        <ul className="menu-aside">
          {arr.map((item: any) => {
            return (
              <li
                key={item.id}
                className="menu-item"
                onClick={() => {
                  cb_setshowSideBar(false);
                }}
              >
                <NavLink
                  // activeClassName="active"
                  className="menu-link"
                  to={item.to}
                >
                  {item.icon}
                  <span className="text">{t(item.text)}</span>
                </NavLink>
              </li>
            );
          })}

          {/*           <li className="menu-item">
          <NavLink
            // activeClassName="active"
            className="menu-link"
            to="/addproduct"
          >
            <i className="icon fas fa-cart-plus"></i>
            <span className="text">Add product</span>
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink
            // activeClassName="active"
            className="menu-link"
            to="/category"
          >
            <i className="icon fas fa-list"></i>
            <span className="text">Categories</span>
          </NavLink>
        </li> */}
        </ul>
        <br />
        <br />
      </nav>
    </aside>
  );
};

export default Sidebar;
