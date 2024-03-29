import React, { useState } from "react";
import Message from "../LoadingError/Error";
import { useNavigate } from "react-router-dom";
import { formatPhone } from "../../utils/commonFunction";
import Loading from "../LoadingError/Loading";
import { useRegisterMutation } from "../../store/components/auth/authApi";
import { Radio } from "antd";
import { useDispatch } from "react-redux";
import { openToast } from "../../store/components/customDialog/toastSlice";

export default function UserRegister() {
  const dispatch = useDispatch();

  window.scrollTo(0, 0);
  const [name, setName] = useState<any>("");
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [phone, setphone] = useState<any>("");
  const [isError, setisError] = useState<any>(false);
  const navigate = useNavigate();

  const [register, { isLoading, error }] = useRegisterMutation();
  console.log(error);
  const onRegister = async (values: any) => {
    const res = await register(values);

    //@ts-ignore
    const data = res?.data;

    if (data) {
      // localStorage.setItem(ACCESSTOKEN_STORAGE, data.token);
      // localStorage.setItem(NAME_STORAGE, data.name);
      //   navigate("/");
      dispatch(
        openToast({
          isOpen: Date.now(),
          content: "Added User Admin Success",
          step: 1,
        })
      );
    } else {
      setisError(true);
      //@ts-ignore
      const error = res?.error;
      const dataError = error?.data ?? [];
      if (dataError?.length > 0) {
        dataError.map((err: any) => {
          const content = err?.msg ?? "Operate Failed";
          const myTimeout = setTimeout(() => {
            dispatch(
              openToast({
                isOpen: Date.now(),
                content: content,
                step: 2,
              })
            );
          }, 100);

          return () => clearTimeout(myTimeout);
        });
      }
    }
  };

  const isValid = () => {
    return !(
      phone.length !== 10 ||
      name === "" ||
      email === "" ||
      password === ""
    );
  };

  const [paymentMethod, setPaymentMethod] = useState<any>("PayPal");
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center login-center">
      {isError && <Message variant="alert-danger" mess={error} />}

      <form
        className="Login col-md-8 col-lg-4 col-11"
        onSubmit={(e) => {
          e.preventDefault();
          if (isValid())
            onRegister({
              name: name,
              email: email,
              password: password,
              phone: phone,
              isAdmin: true,
            });
        }}
      >
        <Radio checked>Role: Admin</Radio>

        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setisError(false);
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setisError(false);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setisError(false);
          }}
        />
        <input
          type="text"
          placeholder="Phone(10)"
          maxLength={10}
          value={phone}
          onChange={(e) => {
            setphone(formatPhone(e.target.value));
            setisError(false);
          }}
        />
        <button type="submit">{isLoading ? <Loading /> : "Register"}</button>
        {/* <p>
          <Link to="/login">
            I Have Account <strong>Login</strong>
          </Link>
        </p> */}
      </form>
    </div>
  );
}
