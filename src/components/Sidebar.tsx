import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { t } = useTranslation();

  return (
    <div>
      <aside className="navbar-aside" id="offcanvas_aside">
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
            <button className="btn btn-icon btn-aside-minimize">
              <i className="text-muted fas fa-stream"></i>
            </button>
          </div>
        </div>

        <nav>
          <ul className="menu-aside">
            <li className="menu-item">
              <NavLink
                // activeClassName="active"
                className="menu-link "
                to="/thudung-list"
              >
                <i className="icon fas fa-usd-circle"></i>
                <span className="text">Thu Dung Pretty LIST BÁN</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                // activeClassName="active"
                className="menu-link "
                to="/thudung-create"
              >
                <i className="icon fas fa-usd-circle"></i>
                <span className="text">Thu Dung Pretty BÁN</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                // activeClassName="active"
                className="menu-link "
                to="/thudung-create-buy"
              >
                <i className="icon fas fa-usd-circle"></i>
                <span className="text">Thu Dung Pretty NHẬP</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                // activeClassName="active"
                className="menu-link "
                to="/thudung-list-buy"
              >
                <i className="icon fas fa-usd-circle"></i>
                <span className="text">Thu Dung Pretty LIST NHẬP</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                // activeClassName="active"
                className="menu-link "
                to="/thudung-sum"
              >
                <i className="icon fas fa-usd-circle"></i>
                <span className="text">Thu Dung Pretty SUM</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                // activeClassName="active"
                className="menu-link"
                to="/"
                // exact={true}
              >
                <i className="icon fas fa-home"></i>
                <span className="text">{t("Dashboard")}</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                // activeClassName="active"
                className="menu-link"
                to="/products"
              >
                <i className="icon fas fa-shopping-bag"></i>
                <span className="text">{t("Products")}</span>
              </NavLink>
            </li>
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
            <li className="menu-item">
              <NavLink
                // activeClassName="active"
                className="menu-link"
                to="/orders"
              >
                <i className="icon fas fa-bags-shopping"></i>
                <span className="text">Orders</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                // activeClassName="active"
                className="menu-link"
                to="/users"
              >
                <i className="icon fas fa-user"></i>
                <span className="text">Users</span>
              </NavLink>
            </li>

            <li className="menu-item">
              <NavLink
                // activeClassName="active"
                className="menu-link"
                to="/reviews"
              >
                <i className="icon fas fa-user"></i>
                <span className="text">Reviews</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                // activeClassName="active"
                className="menu-link disabled"
                to="/sellers"
              >
                <i className="icon fas fa-store-alt"></i>
                <span className="text">Sellers</span>
              </NavLink>
            </li>

            <li className="menu-item">
              <NavLink
                // activeClassName="active"
                className="menu-link disabled"
                to="/transaction"
              >
                <i className="icon fas fa-usd-circle"></i>
                <span className="text">Transactions</span>
              </NavLink>
            </li>
          </ul>
          <br />
          <br />
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
