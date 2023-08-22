import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/LoadingError/Loading";
import Toast from "../components/LoadingError/Toast";
import Message from "../components/LoadingError/Error";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ACCESSTOKEN_STORAGE, NAME_STORAGE } from "../utils/constants";
import { useLoginMutation } from "../store/components/auth/authApi";
import { toast } from "react-toastify";

const Login = () => {
  window.scrollTo(0, 0);
  const navigate = useNavigate();

  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [isError, setisError] = useState<any>(false);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate("/");
  //   }
  // }, [userInfo]);

  const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };

  const [login, { isLoading, error }] = useLoginMutation();

  const onLogin = async (values: any) => {
    const res = await login(values);
    //@ts-ignore
    const data = res?.data;

    if (data) {
      if (data.isAdmin) {
        localStorage.setItem(ACCESSTOKEN_STORAGE, data.token);
        localStorage.setItem(NAME_STORAGE, data.name);
        navigate("/");
      } else {
        toast.error("You are not Admin", ToastObjects);
      }
    } else {
      setisError(true);
    }
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    onLogin({ email: email, password: password });
  };
  return (
    <>
      <Toast />
      <div
        className="card shadow mx-auto"
        style={{ maxWidth: "380px", marginTop: "100px" }}
      >
        <div className="card-body">
          {isError && (
            <Message
              variant="alert-danger"
              mess="Invalid Email or Password"
            ></Message>
          )}
          {isLoading && <Loading />}
          <h4 className="card-title mb-4 text-center">Sign in</h4>
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setisError(false);
                }}
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setisError(false);
                }}
              />
            </div>

            <div className="mb-4">
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
