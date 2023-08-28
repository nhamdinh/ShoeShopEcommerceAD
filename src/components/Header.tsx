import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserInfo, userLogout } from "../store/components/auth/authSlice";
import { useTranslation } from "react-i18next";
import i18n1 from "./../locales/config";
import { useGetProfileQuery } from "../store/components/auth/authApi";
import { LANG_STORAGE } from "../utils/constants";
var $ = require("jquery");

const Header = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  useEffect(() => {
    $("[data-trigger]").on("click", function (e: any) {
      e.preventDefault();
      e.stopPropagation();
      var offcanvas_id = $().attr("data-trigger");
      $(offcanvas_id).toggleClass("show");
    });

    $(".btn-aside-minimize").on("click", function () {
      if (window.innerWidth < 768) {
        $("body").removeClass("aside-mini");
        $(".navbar-aside").removeClass("show");
      } else {
        // minimize sidebar on desktop
        $("body").toggleClass("aside-mini");
      }
    });
  }, []);

  const logoutHandler = () => {
    dispatch(userLogout());
  };

  const [userInfo, setdataFetched] = useState<any>({});
  const { data, error, isSuccess, isLoading } = useGetProfileQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      setdataFetched(data);
      dispatch(setUserInfo({ ...data }));
    } else {
    }
  }, [data]);

  useEffect(() => {
    const lang = localStorage.getItem(LANG_STORAGE);
    if (lang) {
      i18n.changeLanguage(lang);
    } else {
      i18n.changeLanguage("en");
    }
  }, []);

  // useEffect(() => {
  //   if (error?.data?.message === "Not authorized, no token") {
  //     navigate("/login");
  //   }
  // }, [error]);

  return (
    <header className="main-header navbar">
      <div className="col-search">
        <div>
          {" "}
          {t("hello")} &ensp; <span className="userInfo">{userInfo?.name}</span>
        </div>
        {/* <form className="searchform">
          <div className="input-group">
            <input
              list="search_terms"
              type="text"
              className="form-control"
              placeholder="Search term"
            />
            <button className="btn btn-light bg" type="button">
              <i className="far fa-search"></i>
            </button>
          </div>
          <datalist id="search_terms">
            <option value="Products" />
            <option value="New orders" />
            <option value="Apple iphone" />
            <option value="Ahmed Hassan" />
          </datalist>
        </form> */}
      </div>
      <div className="col-nav">
        <button
          className="btn btn-icon btn-mobile me-auto"
          data-trigger="#offcanvas_aside"
        >
          <i className="md-28 fas fa-bars"></i>
        </button>
        <ul className="nav">
          <li className="nav-item">
            <Link className={`nav-link btn-icon `} title="Dark mode" to="#">
              <i className="fas fa-moon"></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link btn-icon" to="#">
              <i className="fas fa-bell"></i>
            </Link>
          </li>
          <li style={{ cursor: "pointer" }}>
            <div
              onClick={() => {
                if (i18n1?.language === "vi") {
                  i18n.changeLanguage("en");
                  localStorage.setItem(LANG_STORAGE, "en");
                } else {
                  i18n.changeLanguage("vi");
                  localStorage.setItem(LANG_STORAGE, "vi");
                }
              }}
              className="nav-link"
            >
              {i18n1?.language === "vi" ? "English" : "Vietnamese"}
            </div>
          </li>
          <li className="dropdown nav-item">
            <Link className="dropdown-toggle" data-bs-toggle="dropdown" to="#">
              <img
                className="img-xs rounded-circle"
                src="https://w.ladicdn.com/5bf3dc7edc60303c34e4991f/logo-15-20200415164142.png"
                alt="User"
              />
            </Link>
            <div className="dropdown-menu dropdown-menu-end">
              {/* <Link className="dropdown-item" to="/">
                My profile
              </Link>
              <Link className="dropdown-item" to="#">
                Settings
              </Link> */}
              <div
                onClick={logoutHandler}
                className="dropdown-item text-danger"
              >
                Exit
              </div>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
